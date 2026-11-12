import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import hero from "../../assets/hero.webp";

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex min-h-120 items-center overflow-hidden md:min-h-150">
      <img
        src={hero}
        alt=""
        fetchPriority="high"
        loading="eager"
        decoding="async"
        width={1290}
        height={726}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 -z-10 bg-black/35 md:bg-transparent md:bg-linear-to-r md:from-black/65 md:via-black/35 md:to-transparent md:rtl:bg-linear-to-l" />

      <div className="px-6 py-12 md:px-16 lg:px-24">
        <div className="max-w-xl space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sand rtl:tracking-normal">
            {t("hero.eyebrow")}
          </p>

          <h1 className="font-serif text-4xl font-semibold leading-tight text-cream md:text-6xl rtl:leading-snug">
            {t("hero.titleFirstLine")}
            <br />
            {t("hero.titleSecondLine")}
          </h1>

          <p className="max-w-md text-base leading-7 text-cream/90 md:text-lg">
            {t("hero.description")}
          </p>

          <div className="pt-4">
            <Link
              to="/menu"
              className={`rounded-full bg-olive px-6 py-3 font-medium text-cream transition-colors hover:bg-olive/90 ${focus}`}
            >
              {t("hero.exploreMenu")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
