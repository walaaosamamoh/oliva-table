import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo2.webp";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.resolvedLanguage?.startsWith("ar");

  const navList = [
    { labelKey: "nav.home", to: "/" },
    { labelKey: "nav.menu", to: "/menu" },
    { labelKey: "nav.about", to: "/about" },
    { labelKey: "nav.contact", to: "/contact" },
  ];

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-olive px-6 py-12 text-cream md:px-16 lg:px-24 mt-auto w-full shrink-0"
    >
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <NavLink to="/" aria-label={t("nav.home")}>
          <img
            src={logo}
            alt="Oliva Table — Mediterranean Kitchen"
            className="h-20 w-auto object-contain md:h-24"
          />
        </NavLink>

        <nav
          aria-label={isArabic ? "التنقل في تذييل الصفحة" : "Footer navigation"}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-8"
        >
          {navList.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `py-2 text-sm transition-colors ${
                  isActive
                    ? "text-terracotta"
                    : "text-cream hover:text-terracotta"
                }`
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-6 text-center">
        <NavLink
          to="/track-order"
          className="text-sm text-cream/70 underline underline-offset-4 transition-colors hover:text-terracotta"
        >
          {t("tracking.trackOrder")}
        </NavLink>
      </div>

      <div className="mt-8 border-t border-cream/15 pt-6 text-center">
        <p className="text-xs text-cream/60">
          © {new Date().getFullYear()} Oliva Table.{" "}
          {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
