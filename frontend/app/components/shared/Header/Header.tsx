import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 py-3 transition-all duration-300 text-base-100 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-medium">
            M.
            <span className="text-secondary">I.</span> Shakib
          </Link>

          <nav className="space-x-8">
            <NavLink
              to="/"
              className="hover:text-secondary duration-300 cursor-pointer"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-secondary duration-300 cursor-pointer"
            >
              About
            </NavLink>
            <NavLink
              to="/project"
              className="hover:text-secondary duration-300 cursor-pointer"
            >
              Project
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-secondary duration-300 cursor-pointer"
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
