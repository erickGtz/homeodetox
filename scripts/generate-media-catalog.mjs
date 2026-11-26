
import {
  S3Client,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const {
  R2_ENDPOINT,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  NEXT_PUBLIC_R2_PUBLIC_URL,
} = process.env;

// Validar configuración
const requiredVariables = {
  R2_ENDPOINT,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  NEXT_PUBLIC_R2_PUBLIC_URL,
};

for (const [name, value] of Object.entries(requiredVariables)) {
  if (!value) {
    throw new Error(`Falta configurar ${name} en .env.local`);
  }
}

// Conexión con Cloudflare R2
const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const publicUrl = NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/$/, "");

function getMediaType(filename) {
  const extension = path.extname(filename).toLowerCase();

  const videoExtensions = [".mp4", ".webm", ".mov", ".m4v"];
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

  if (videoExtensions.includes(extension)) return "video";
  if (imageExtensions.includes(extension)) return "image";

  return "other";
}

function encodeKey(key) {
  return key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

async function generateCatalog() {
  console.log("Conectando con Cloudflare R2...");

  const files = [];
  let continuationToken;

  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: R2_BUCKET_NAME,
        ContinuationToken: continuationToken,
      })
    );

    for (const object of response.Contents ?? []) {
      if (!object.Key || object.Key.endsWith("/")) continue;

      const segments = object.Key.split("/");
      const filename = segments.pop();

      files.push({
        key: object.Key,
        folder: segments.join("/") || "general",
        filename,
        extension: path.extname(filename).toLowerCase(),
        type: getMediaType(filename),
        size: object.Size ?? 0,
        lastModified: object.LastModified?.toISOString() ?? null,
        url: `${publicUrl}/${encodeKey(object.Key)}`,
      });
    }

    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  files.sort((a, b) =>
    a.key.localeCompare(b.key, "es", { sensitivity: "base" })
  );

  const catalog = {
    generatedAt: new Date().toISOString(),
    bucket: R2_BUCKET_NAME,
    totalFiles: files.length,
    totalImages: files.filter((file) => file.type === "image").length,
    totalVideos: files.filter((file) => file.type === "video").length,
    files,
  };

  const outputDirectory = path.join(process.cwd(), "src", "data");
  const outputFile = path.join(outputDirectory, "catalogo-media.json");

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputFile, JSON.stringify(catalog, null, 2), "utf8");

  console.log("\nCatálogo generado correctamente.");
  console.log(`Archivos encontrados: ${files.length}`);
  console.log(`Imágenes: ${catalog.totalImages}`);
  console.log(`Videos: ${catalog.totalVideos}`);
  console.log(`Ubicación: ${outputFile}`);
}

generateCatalog().catch((error) => {
  console.error("\nError al generar el catálogo:", error.message);
  process.exitCode = 1;
});
