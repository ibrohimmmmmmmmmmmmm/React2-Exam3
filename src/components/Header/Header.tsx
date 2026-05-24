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

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
  { name: "Sign Up", href: "/signup" },
];

const Header = memo(() => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", fn, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", fn);
  }, []);

  const navClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `
    relative px-4 py-1.5 rounded-full
    text-[15px] font-medium
    transition-all duration-300

    ${
      isActive
        ? `
          text-black dark:text-white
          font-semibold
          after:absolute
          after:bottom-0.5
          after:left-4
          after:right-4
          after:h-0.5
          after:rounded-full
          after:bg-black
          dark:after:bg-white
        `
        : `
          text-neutral-500
          dark:text-neutral-400
          hover:text-black
          dark:hover:text-white
          hover:bg-neutral-100
          dark:hover:bg-white/10
        `
    }
  `;

  const mobileNavClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    `
    px-5 py-4 text-[16px]
    font-medium border-b
    transition-all duration-300

    ${
      isActive
        ? `
          text-black dark:text-white
          font-semibold
          border-l-2
          border-l-black
          dark:border-l-white
          pl-[18px]
          bg-neutral-50
          dark:bg-white/5
        `
        : `
          text-neutral-500
          dark:text-neutral-400
          border-neutral-100
          dark:border-neutral-800
          hover:text-black
          dark:hover:text-white
        `
    }
  `;

  return (
    <header
      className={`
        w-full sticky top-0 z-50
        transition-all duration-300

        bg-white/90 dark:bg-[#0B0B0F]/85
        backdrop-blur-xl

        ${
          scrolled
            ? `
              shadow-md
              dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
            `
            : `
              border-b border-neutral-100
              dark:border-white/5
            `
        }
      `}
    >
      <div
        className="
          max-w-7xl mx-auto
          h-[68px]
          px-4 md:px-8
          flex items-center justify-between
          gap-4
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="
                  p-2 rounded-full
                  hover:bg-neutral-100
                  dark:hover:bg-white/10
                  dark:text-white
                  transition
                  lg:hidden
                "
              >
                <Menu size={22} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="
                w-[280px] p-0
                bg-white dark:bg-[#0B0B0F]
                border-r dark:border-white/10
              "
            >
              <div
                className="
                  h-[68px] px-5
                  flex items-center justify-between
                  border-b border-neutral-100
                  dark:border-white/10
                "
              >
                <div className="flex items-center gap-2">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-30 object-contain"
                  />
                </div>

                <button
                  className="
                    relative p-3 rounded-full
                    hover:bg-neutral-100
                    dark:hover:bg-white/10
                    dark:text-white
                    transition
                  "
                >
                  <ShoppingCart size={20} />
                </button>
              </div>

              <nav className="flex flex-col">
                {navLinks.map((l) => {
                  if (
                    getToken() &&
                    (l.href === "/signup" ||
                      l.href === "/signup2")
                  ) {
                    return null;
                  }

                  return (
                    <NavLink
                      key={l.name}
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className={mobileNavClass}
                    >
                      {l.name}
                    </NavLink>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <NavLink
            to="/"
            className="flex items-center gap-2"
          >
            <img src={logo} alt="logo" />
          </NavLink>
        </div>

        {/* CENTER */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => {
            if (
              getToken() &&
              (l.href === "/signup" ||
                l.href === "/signup2")
            ) {
              return null;
            }

            return (
              <NavLink
                key={l.name}
                to={l.href}
                className={navClass}
              >
                {l.name}
              </NavLink>
            );
          })}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* SEARCH */}
          <div className="relative hidden md:block">
            <input
              placeholder="What are you looking for?"
              className="
                w-[240px] h-10
                bg-neutral-100
                dark:bg-white/5

                text-black
                dark:text-white

                placeholder:text-neutral-400
                dark:placeholder:text-neutral-500

                rounded-full
                pl-4 pr-10
                text-[13px]
                outline-none

                border border-transparent
                dark:border-white/5

                focus:w-[290px]
                focus:bg-white
                dark:focus:bg-[#14141A]

                focus:ring-1
                focus:ring-black
                dark:focus:ring-white/20

                transition-all duration-300
              "
            />

            <Search
              size={15}
              className="
                absolute right-3.5 top-1/2
                -translate-y-1/2
                text-neutral-400
                dark:text-neutral-500
                pointer-events-none
              "
            />
          </div>

          {/* SWITCHERS */}
          <div
            className="
              grid grid-cols-2 gap-2
              p-1.5 rounded-2xl

              bg-neutral-50
              dark:bg-[#121218]

              border border-neutral-100
              dark:border-white/5

              shadow-sm
              dark:shadow-[0_0_20px_rgba(255,255,255,0.03)]
            "
          >
            <div className="flex justify-center scale-90 [&_button]:w-full">
              <LanguageSwitcher />
            </div>

            <div className="flex justify-center scale-90 [&_button]:w-full">
              <ThemeSwitcher />
            </div>
          </div>

          {/* ICONS */}
          <div
            className="
              flex items-center gap-1
              dark:[&_button]:hover:bg-white/10
              dark:[&_button]:text-white
            "
          >
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