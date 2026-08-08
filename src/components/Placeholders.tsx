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
      className={`overflow-hidden rounded-full border-4 border-card shadow-xl ring-2 ring-brand/20 ${className}`}
    >
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div
          className="font-display flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-brand-dark text-3xl font-semibold tracking-wide text-white"
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
      className="h-full w-full bg-[linear-gradient(135deg,#7eb8be_0%,#4a9aa3_28%,#2d7a82_58%,#1f5f66_100%)]"
      aria-hidden
    >
      <div className="h-full w-full bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(212,160,90,0.28),transparent_40%)]" />
    </div>
  );
}
