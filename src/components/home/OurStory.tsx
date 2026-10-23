
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import storyBowl from "../../assets/storyBowl.jpg";

export default function OurStory() {
  const { t } = useTranslation();

  return (
    <section className="grid gap-8 px-6 py-12 md:grid-cols-2 md:items-center md:gap-12 md:px-16 lg:px-24">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-olive rtl:tracking-normal">
          {t("story.eyebrow")}
        </p>

        <h2 className="font-serif text-2xl font-semibold text-olive md:text-4xl">
          {t("story.title")}
        </h2>

        <p className="max-w-lg leading-7 text-charcoal/80">
          {t("story.description")}
        </p>

        <Link
          to="/about"
          className="inline-block rounded-lg bg-olive px-6 py-2 text-cream transition-colors hover:bg-olive/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
        >
          {t("story.learnMore")}
        </Link>
      </div>

      <div className="h-72 overflow-hidden rounded-2xl md:h-96">
        <img
          src={storyBowl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
