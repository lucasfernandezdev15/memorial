interface ProfileAvatarProps {
  initials: string;
  photoUrl?: string;
  name: string;
  className?: string;
}

export function ProfileAvatar({
  initials,
  photoUrl,
  name,
  className = "h-24 w-24",
}: ProfileAvatarProps) {
  return (
    <div
      className={`overflow-hidden rounded-full border border-brass-soft/60 shadow-[0_0_0_6px_rgba(26,47,40,0.25)] ${className}`}
    >
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-b from-brand-mid to-brand font-serif text-3xl font-medium tracking-[0.12em] text-brass-soft"
          aria-label={name}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

export function HeroBanner({ bannerUrl }: { bannerUrl?: string }) {
  if (bannerUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={bannerUrl} alt="" className="h-full w-full object-cover" />
    );
  }

  return (
    <div
      className="h-full w-full bg-[radial-gradient(ellipse_at_60%_40%,#3d5a52_0%,#1a2f28_45%,#0f1c18_100%)]"
      aria-hidden
    >
      <div className="h-full w-full bg-[linear-gradient(115deg,transparent_20%,rgba(156,139,110,0.12)_50%,transparent_80%)]" />
    </div>
  );
}
