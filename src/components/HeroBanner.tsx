import heroArt from "@/assets/hero-art.jpg";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const SkyStars = lazy(() => import("./SkyStars"));

export function HeroBanner() {
  const banner = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const element = banner.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => setAnimate(visible && !motion.matches && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      update();
    });
    observer.observe(element);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div ref={banner} className="banner-art group relative -mx-4 mb-2 overflow-hidden sm:-mx-6">
      <img
        src={heroArt}
        alt="A knight resting in a field of flowers under a bright sky"
        width={1920}
        height={640}
        className="h-48 w-full object-cover brightness-[1.08] saturate-[1.16] transition-transform duration-[2500ms] ease-out motion-safe:group-hover:scale-[1.03] dark:brightness-[1.05] dark:saturate-[1.1] sm:h-64"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[55%]">
        {animate && <Suspense fallback={null}><SkyStars /></Suspense>}
      </div>
      {/* soft fade into the page background on every edge */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/30 dark:from-background/60 dark:to-background" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background/50 via-transparent to-background/50 dark:block" />
    </div>
  );
}
