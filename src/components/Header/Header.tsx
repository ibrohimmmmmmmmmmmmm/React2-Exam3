import { memo, useState, useEffect } from "react";
import { Menu, Search, Heart, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/Group 1116606595 (4).png";
import { getToken } from "../../utils/token";
import UserDropdown from "./UserDropdown/UserDropdown";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
  { name: "Sign Up", href: "/signup" },
];
const Header = memo(() => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-1.5 rounded-full text-[15px] font-medium transition-colors
    ${isActive
      ? "text-black font-semibold after:absolute after:bottom-0.5 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-black"
      : "text-neutral-500 hover:text-black hover:bg-neutral-100"}`;

  const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `px-5 py-4 text-[16px] font-medium border-b border-neutral-100 transition-colors
    ${isActive ? "text-black font-semibold border-l-2 border-l-black pl-[18px]" : "text-neutral-500 hover:text-black"}`;

  return (
    <header className={`w-full bg-white sticky top-0 z-50 transition-shadow ${scrolled ? "shadow-md" : "border-b border-neutral-100"}`}>
      <div className="max-w-7xl mx-auto h-[68px] px-4 md:px-8 flex items-center justify-between gap-4">

        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-full hover:bg-neutral-100 transition lg:hidden">
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">

              <div className="h-[68px] px-5 flex items-center justify-between border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="logo" className="w-30 object-contain" />
                </div>

                <button className="relative p-6 rounded-full hover:bg-neutral-100 transition">
                  <ShoppingCart size={20} />
                </button>
              </div>

              <nav className="flex flex-col">
                {navLinks.map((l) => {
                  if(getToken() && l.href === "/signup") {
                    return null;
                  }
                  return (
                    <NavLink key={l.name} to={l.href} onClick={() => setOpen(false)} className={mobileNavClass}>
                      {l.name}
                    </NavLink>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo"  />
          </NavLink>
        </div>
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => {
            if(getToken() && l.href === "/signup") {
              return null;
            }
            return (
              <NavLink key={l.name} to={l.href} className={navClass}>
                {l.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <div className="relative hidden md:block">
            <input
              placeholder="What are you looking for?"
              className="w-[240px] h-10 bg-neutral-100 rounded-full pl-4 pr-10 text-[13px] outline-none focus:w-[290px] focus:bg-white focus:ring-1 focus:ring-black transition-all"
            />
            <Search size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>

          <button className="hidden lg:block p-2 rounded-full hover:bg-neutral-100 transition" aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.8} />
          </button>

          <button className="relative p-2 rounded-full hover:bg-neutral-100 transition" aria-label="Cart">
            <ShoppingCart size={20} strokeWidth={1.8} />
          </button>

          

          <UserDropdown  />
        </div>
      </div>
    </header>
  );
});

export default Header;