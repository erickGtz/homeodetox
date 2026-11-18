"use client";

import { useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconPlay } from "@/components/ui/icons";
import type { TherapyLabels, TherapyVideo } from "@/content/terapias";
import { cn } from "@/lib/utils";

type VideoCarouselProps = {
  videos: TherapyVideo[];
  labels: TherapyLabels;
};

function drivePreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function VideoCarousel({ videos, labels }: VideoCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const hasMany = videos.length > 1;

  function goTo(nextIndex: number) {
    const track = trackRef.current;
    const slide = track?.children[nextIndex] as HTMLElement | undefined;

    if (!track || !slide) {
      return;
    }

    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setIndex(nextIndex);
  }

  if (videos.length === 0) {
    return <p className="text-sm text-white/70">{labels.videoMissing}</p>;
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-3">
      <ul
        ref={trackRef}
        className="relative flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto overflow-y-hidden pb-1 [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((video) => {
          const isPlaying = playingId === video.id && Boolean(video.driveFileId);

          return (
            <li key={video.id} className="aspect-video w-full min-w-full snap-start">
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-black/30">
                {isPlaying && video.driveFileId ? (
                  <iframe
                    src={drivePreviewUrl(video.driveFileId)}
                    title={video.title}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <button
                    type="button"
                    disabled={!video.driveFileId}
                    onClick={() => setPlayingId(video.id)}
                    className={cn(
                      "flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center transition-colors",
                      video.driveFileId
                        ? "hover:bg-white/10"
                        : "cursor-not-allowed border border-dashed border-white/25",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-11 items-center justify-center rounded-full bg-white/15 text-white"
                    >
                      <IconPlay className="size-4" />
                    </span>
                    <span className="text-sm font-medium text-white">{video.title}</span>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-white/60 uppercase">
                      {video.driveFileId ? labels.videoPlay : labels.videoPending}
                    </span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {hasMany ? (
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label={labels.previousVideo}
            className="flex size-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 disabled:opacity-35 disabled:hover:bg-transparent"
          >
            <IconChevronLeft className="size-4" />
          </button>

          <p aria-live="polite" className="text-xs font-semibold tracking-widest text-white/70">
            {labels.slideLabel
              .replace("{current}", String(index + 1))
              .replace("{total}", String(videos.length))}
          </p>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === videos.length - 1}
            aria-label={labels.nextVideo}
            className="flex size-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 disabled:opacity-35 disabled:hover:bg-transparent"
          >
            <IconChevronRight className="size-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
