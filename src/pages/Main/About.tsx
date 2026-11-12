import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import storyImage from "../../assets/storyBowl.webp";

export default function About() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.resolvedLanguage?.startsWith("ar");

  const values = ["fresh", "quality", "togetherness"] as const;

  return (
    <main>
      {/* Hero */}
      <section className="px-6 py-16 md:px-16 md:py-24 lg:px-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-terracotta">
            {t("about.eyebrow")}
          </p>

          <h1 className="mx-auto max-w-4xl font-serif text-4xl leading-tight text-olive md:text-6xl">
            {t("about.title")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-charcoal/75">
            {t("about.intro")}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-16 md:px-16 md:pb-24 lg:px-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="overflow-hidden rounded-3xl">
            <img
              src={storyImage}
              alt={t("about.imageAlt")}
              className="h-80 w-full object-cover md:h-125"
            />
          </div>

          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-terracotta">
              {t("about.storyEyebrow")}
            </p>

            <h2 className="font-serif text-3xl leading-snug text-olive md:text-4xl">
              {t("about.storyTitle")}
            </h2>

            <p className="leading-8 text-charcoal/75">
              {t("about.storyParagraph1")}
            </p>

            <p className="leading-8 text-charcoal/75">
              {t("about.storyParagraph2")}
            </p>
          </div>
        </div>
      </section>

      {/* Our values */}
      <section className="bg-olive px-6 py-16 text-cream md:px-16 md:py-20 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-sand">
              {t("about.valuesEyebrow")}
            </p>

            <h2 className="font-serif text-3xl md:text-4xl">
              {t("about.valuesTitle")}
            </h2>

            <p className="mt-4 leading-7 text-cream/75">
              {t("about.valuesDescription")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <article
                key={value}
                className="border-t border-cream/25 pt-6"
              >
                <span className="font-serif text-3xl text-sand">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-5 font-serif text-2xl">
                  {t(`about.values.${value}.title`)}
                </h3>

                <p className="mt-3 leading-7 text-cream/75">
                  {t(`about.values.${value}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-16 text-center md:px-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl leading-snug text-olive md:text-5xl">
            {t("about.ctaTitle")}
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-charcoal/75">
            {t("about.ctaDescription")}
          </p>

          <Link
            to="/menu"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-olive px-6 py-3 font-medium text-cream transition hover:bg-olive/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
          >
            {t("about.ctaButton")}
            <ArrowUpRight
              size={18}
              className={isArabic ? "-rotate-90deg" : ""}
            />
          </Link>
        </div>
      </section>
    </main>
  );
}