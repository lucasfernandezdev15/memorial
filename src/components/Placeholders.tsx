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
      className={`overflow-hidden rounded-full border-4 border-white shadow-md ${className}`}
    >
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand to-brand-dark text-2xl font-semibold tracking-wide text-white"
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
      className="h-full w-full bg-[linear-gradient(160deg,#c5d4e8_0%,#8fa8c4_35%,#6b8aaa_70%,#4a6d8c_100%)]"
      aria-hidden
    >
      <div className="h-full w-full opacity-40 bg-[radial-gradient(ellipse_at_30%_80%,rgba(255,255,255,0.55),transparent_55%),radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.25),transparent_40%)]" />
    </div>
  );
}
