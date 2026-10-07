import heroArt from "@/assets/hero-art.jpg.asset.json";

export function HeroBanner() {
  return (
    <div className="banner-art group relative -mx-4 mb-2 overflow-hidden sm:-mx-6">
      <img
        src={heroArt.url}
        alt="A knight resting in a field of flowers under a bright sky"
        width={1920}
        height={640}
        className="h-48 w-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-[1.03] sm:h-64"
      />
      {/* soft fade into the page background on every edge */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
    </div>
  );
}
