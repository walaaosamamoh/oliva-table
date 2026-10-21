import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { useState } from "react";

export default function Navbar() {
  const navList = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="relative flex justify-between items-center px-4 md:px-8 text-olive">
      <Link to="/" className="flex items-center gap-2 font-bold">
        <img
          src={logo}
          alt=""
          className="h-12 w-12 md:h-16 md:w-16"
        />
        <span className="text-xl md:text-2xl uppercase">Oliva Table</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 font-semibold">
        {navList.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `py-1 border-b-2 ${
                isActive
                  ? "border-terracotta"
                  : "border-transparent hover:border-sand"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => {
            setSearchOpen((prev) => !prev);
            setOpen(false);
          }}
          aria-label={searchOpen ? "Close search" : "Open search"}
          aria-expanded={searchOpen}
          className="grid size-11 place-items-center rounded-full text-olive transition-colors hover:bg-sand/30 focus-visible:outline-2 focus-visible:outline-terracotta"
        >
          {searchOpen ? (
            <X className="size-5" strokeWidth={1.7} />
          ) : (
            <Search className="size-5" strokeWidth={1.7} />
          )}
        </button>

        <Link
          to="/cart"
          className="hidden md:grid size-11 place-items-center rounded-full hover:bg-sand/40 focus-visible:outline-2 focus-visible:outline-terracotta"
          aria-label="Cart"
        >
          <ShoppingCart className="size-5" />
        </Link>
        <div className="relative hidden md:block">
          <select
            aria-label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "ar")}
            className="h-10 cursor-pointer appearance-none rounded-full border border-sand/70 bg-transparent py-2 pl-3 pr-9 text-sm font-semibold text-olive transition-colors hover:bg-sand/30 outline-none"
          >
            <option value="en" className="bg-cream text-olive">
              EN
            </option>
            <option value="ar" className="bg-cream text-olive">
              AR
            </option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-olive"
          />
        </div>
        <button
          className="grid size-11 place-items-center rounded-full hover:bg-sand/40 focus-visible:outline-2 focus-visible:outline-terracotta md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => {
            setOpen((prev) => !prev);
            setSearchOpen(false);
          }}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {searchOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const query = searchQuery.trim();

            if (query) {
              // Connect this to your menu search logic later.
              console.log("Search:", query);
            }
          }}
          className="absolute inset-x-4 top-full z-20 mt-2 flex items-center gap-3 rounded-xl border border-sand/70 bg-cream p-3 shadow-lg md:inset-x-auto md:right-8 md:w-96"
        >
          <Search className="size-5 shrink-0 text-olive" />

          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes..."
            aria-label="Search dishes"
            autoFocus
            className="min-w-0 flex-1 bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/50"
          />

          <button
            type="submit"
            className="rounded-full bg-olive px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-charcoal"
          >
            Search
          </button>
        </form>
      )}

      {open && (
        <nav
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full z-50 border-t border-sand/60 bg-cream px-5 pb-5 pt-4 shadow-lg md:hidden"
        >
          {/* Navigation links */}
          <div className="flex flex-col gap-1">
            {navList.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-lg px-4 py-3.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-olive/5 text-olive"
                      : "text-charcoal hover:bg-sand/20"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Cart link */}
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center gap-3 rounded-lg border border-sand/70 px-4 py-3.5 text-sm font-medium text-olive transition-colors hover:bg-sand/20"
          >
            <ShoppingCart className="size-5" strokeWidth={1.7} />
            <span>Shopping Cart</span>
          </Link>

          {/* Language selector */}
          <div className="mt-4 flex items-center justify-between border-t border-sand/70 pt-4">
            <span className="text-xs font-medium uppercase tracking-widest text-charcoal/60">
              Language
            </span>

            <div
              className="relative flex w-28 items-center rounded-full bg-sand/40 p-1"
              role="group"
              aria-label="Choose language"
            >
              {/* Sliding active background */}
              <span
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-olive shadow-sm transition-transform duration-300 ease-in-out ${
                  language === "ar"
                    ? "translate-x-[calc(100%+4px)]"
                    : "translate-x-0"
                }`}
              />

              <button
                type="button"
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                className={`relative z-10 flex-1 rounded-full py-2 text-xs font-semibold transition-colors duration-200 ${
                  language === "en" ? "text-cream" : "text-olive"
                }`}
              >
                EN
              </button>

              <button
                type="button"
                onClick={() => setLanguage("ar")}
                aria-pressed={language === "ar"}
                className={`relative z-10 flex-1 rounded-full py-2 text-xs font-semibold transition-colors duration-200 ${
                  language === "ar" ? "text-cream" : "text-olive"
                }`}
              >
                AR
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
