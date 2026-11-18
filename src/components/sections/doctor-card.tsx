import { MediaFrame } from "@/components/ui/media-frame";
import { IconClock, IconMap, IconPhone } from "@/components/ui/icons";

type DoctorCardProps = {
  eyebrow: string;
  name: string;
  description: string;
  photoLabel: string;
  photoSrc?: string | null;
  address: string;
  schedule: string;
  phone: string;
  phoneHref: string;
};

export function DoctorCard({
  eyebrow,
  name,
  description,
  photoLabel,
  photoSrc,
  address,
  schedule,
  phone,
  phoneHref,
}: DoctorCardProps) {
  return (
    <div className="bg-primary text-on-primary">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_261px] lg:items-center lg:gap-12 lg:p-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-white/70 uppercase">
            {eyebrow}
          </p>
          <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{name}</h3>
          <div aria-hidden="true" className="mt-6 h-px w-full bg-white/20" />
          <p className="mt-6 max-w-2xl text-sm leading-[1.8] text-white/80">{description}</p>
          <ul className="mt-6 flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <IconMap className="mt-0.5 size-5 shrink-0 text-white/70" />
              <span className="text-white/90">{address}</span>
            </li>
            <li className="flex items-start gap-3">
              <IconClock className="mt-0.5 size-5 shrink-0 text-white/70" />
              <span className="text-white/90">{schedule}</span>
            </li>
            <li className="flex items-start gap-3">
              <IconPhone className="mt-0.5 size-5 shrink-0 text-white/70" />
              <a
                href={`tel:${phoneHref}`}
                className="text-white/90 underline-offset-4 hover:underline"
              >
                {phone}
              </a>
            </li>
          </ul>
        </div>
        <MediaFrame
          src={photoSrc}
          alt={photoLabel}
          label={photoLabel}
          className="aspect-[261/326] w-full max-w-[261px] rounded-xl lg:justify-self-end"
          sizes="(min-width: 1024px) 261px, 100vw"
        />
      </div>
    </div>
  );
}
