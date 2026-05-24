import { memo, useState, useEffect } from "react";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import logo from "@/assets/Group 1116606595 (4).png";

import { getToken } from "../../utils/token";

import UserDropdown from "./UserDropdown/UserDropdown";
import HeartComp from "./HeartComp";
import ShoppingIcon from "./ShoppingIcon";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

import { useTranslation } from "react-i18next";

const navLinks = [
  { key: "home", href: "/" },
  { key: "contact", href: "/contact" },
  { key: "about", href: "/about" },
  { key: "signup", href: "/signup" },
];

const Header = memo(() => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navClass = ({ isActive }: { isActive: boolean }) => `
    relative px-4 py-1.5 rounded-full
    text-[15px] font-medium
    transition-all duration-300
    ${
      isActive
        ? `text-black dark:text-white font-semibold`
        : `text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white`
    }
  `;

  const mobileNavClass = ({ isActive }: { isActive: boolean }) => `
    px-5 py-4 text-[16px] font-medium border-b
    transition-all duration-300
    ${
      isActive
        ? `text-black dark:text-white font-semibold bg-neutral-50 dark:bg-white/5`
        : `text-neutral-500 dark:text-neutral-400`
    }
  `;

  return (
    <header
      className={`
        w-full sticky top-0 z-50 transition-all duration-300
        bg-white/90 dark:bg-[#0B0B0F]/85 backdrop-blur-xl
        ${scrolled ? "shadow-md" : "border-b border-neutral-100 dark:border-white/5"}
      `}
    >
      <div className="max-w-7xl mx-auto h-[68px] px-4 md:px-8 flex items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-full lg:hidden">
                <Menu size={22} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px] p-0">
              <div className="h-[68px] px-5 flex items-center justify-between border-b">
                <img src={logo} alt="logo" className="w-30 object-contain" />
                <ShoppingCart size={20} />
              </div>

              {/* NAV */}
              <nav className="flex flex-col">
                {navLinks.map((l) => {
                  if (
                    getToken() &&
                    (l.href === "/signup" || l.href === "/signup2")
                  ) {
                    return null;
                  }

                  return (
                    <NavLink
                      key={l.key}
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className={mobileNavClass}
                    >
                      {t(`header.nav.${l.key}`)}
                    </NavLink>
                  );
                })}
              </nav>

              {/* MOBILE SETTINGS DROPDOWN */}
              <div className="px-5 py-4 border-t">
                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center justify-between text-neutral-600 dark:text-neutral-300 font-medium">
                    Settings
                    <span className="group-open:rotate-180 transition-transform">
                      ⌄
                    </span>
                  </summary>

                  <div className="mt-3 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">
                        Language
                      </span>
                      <LanguageSwitcher />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">Theme</span>
                      <ThemeSwitcher />
                    </div>
                  </div>
                </details>
              </div>
            </SheetContent>
          </Sheet>

          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>

        {/* CENTER */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => {
            if (
              getToken() &&
              (l.href === "/signup" || l.href === "/signup2")
            ) {
              return null;
            }

            return (
              <NavLink key={l.key} to={l.href} className={navClass}>
                {t(`header.nav.${l.key}`)}
              </NavLink>
            );
          })}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          {/* SEARCH */}
          <div className="relative hidden md:block">
            <input
              placeholder={t("header.searchPlaceholder")}
              className="w-[240px] h-10 bg-neutral-100 dark:bg-white/5 rounded-full px-4 pr-10 text-[13px] outline-none"
            />
            <Search
              size={15}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
          </div>

          {/* SWITCHERS (DESKTOP ONLY) */}
          <div className="hidden md:grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-neutral-50 dark:bg-[#121218]">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-1">
            <HeartComp />
            <ShoppingIcon />
            <UserDropdown />
          </div>

        </div>
      </div>
    </header>
  );
});

export default Header;