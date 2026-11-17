import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { IconArrowRight, IconPlay } from "@/components/ui/icons";
import { MediaFrame } from "@/components/ui/media-frame";
import type { BlogPost } from "@/lib/content/schemas";
import { formatDate } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  const href = `/blog/${post.slug}`;
  const isVideo = post.type === "video";

  return (
    <article className={className}>
      <div className="relative">
        <MediaFrame
          src={post.cover ?? undefined}
          alt={`Portada de ${post.title}`}
          label={`Portada de ${post.title}`}
          className="rounded-card aspect-[299/269]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <Badge variant={post.type} className="absolute top-3 left-3">
          {isVideo ? "Video" : "Post"}
        </Badge>
        {isVideo ? (
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <span className="bg-primary/90 flex size-[52px] items-center justify-center rounded-full pl-1 shadow-lg">
              <IconPlay className="text-on-primary size-5" />
            </span>
          </span>
        ) : null}
        {isVideo && post.duration ? (
          <span className="absolute right-3 bottom-3 rounded bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
            {post.duration}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5 px-0.5 pt-3">
        <h3 className="text-text text-[15px] leading-snug font-medium">
          <Link href={href} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        <time dateTime={post.date} className="text-text-muted text-[11px]">
          {formatDate(post.date)}
        </time>
        <p className="text-text-muted line-clamp-2 text-[13px] leading-snug font-light">
          {post.excerpt}
        </p>
        <Link
          href={href}
          className="text-primary mt-1 inline-flex items-center gap-1 text-[13px] font-medium"
        >
          Leer más
          <IconArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
