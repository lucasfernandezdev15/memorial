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
      className={`overflow-hidden rounded-full border-4 border-card shadow-md ring-1 ring-stone ${className}`}
    >
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div
          className="font-display flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-brand-dark text-2xl font-semibold tracking-wide text-card"
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
      className="h-full w-full bg-[linear-gradient(145deg,#c5c0b6_0%,#8a9399_40%,#3f5360_78%,#32434e_100%)]"
      aria-hidden
    >
      <div className="h-full w-full bg-[radial-gradient(ellipse_at_30%_75%,rgba(247,245,240,0.28),transparent_55%),radial-gradient(ellipse_at_85%_20%,rgba(183,169,138,0.22),transparent_40%)]" />
    </div>
  );
}
