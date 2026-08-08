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
      className={`overflow-hidden rounded-full border-4 border-white shadow-md ring-2 ring-brand/15 ${className}`}
    >
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div
          className="font-display flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-brand-dark text-2xl font-semibold tracking-wide text-white"
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
      className="h-full w-full bg-[linear-gradient(135deg,#8ec4c9_0%,#4fa3ab_35%,#2d7f87_70%,#1f6f78_100%)]"
      aria-hidden
    >
      <div className="h-full w-full bg-[radial-gradient(ellipse_at_25%_80%,rgba(255,255,255,0.35),transparent_50%),radial-gradient(ellipse_at_90%_15%,rgba(212,160,90,0.25),transparent_40%)]" />
    </div>
  );
}
