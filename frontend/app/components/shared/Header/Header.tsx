import { useGetLogoQuery } from "@/redux/features/logo/logoApi";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { data } = useGetLogoQuery({});
  const logo = data?.data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navLinks = (
    <>
      <Link
        to="#about"
        onClick={() => setMenuOpen(false)}
        className={`duration-300 ${
          activeSection === "about" ? "text-secondary" : "hover:text-secondary"
        }`}
      >
        About
      </Link>
      <Link
        to="#service"
        onClick={() => setMenuOpen(false)}
        className={`duration-300 ${
          activeSection === "service"
            ? "text-secondary"
            : "hover:text-secondary"
        }`}
      >
        Service
      </Link>
      <Link
        to="#skill"
        onClick={() => setMenuOpen(false)}
        className={`duration-300 ${
          activeSection === "skill" ? "text-secondary" : "hover:text-secondary"
        }`}
      >
        Skill
      </Link>
      <Link
        to="#projects"
        onClick={() => setMenuOpen(false)}
        className={`duration-300 ${
          activeSection === "projects"
            ? "text-secondary"
            : "hover:text-secondary"
        }`}
      >
        Projects
      </Link>
      <Link
        to="#contact"
        onClick={() => setMenuOpen(false)}
        className={`duration-300 ${
          activeSection === "contact"
            ? "text-secondary"
            : "hover:text-secondary"
        }`}
      >
        Contact
      </Link>
    </>
  );

  return (
    <header
      className={`fixed w-full top-0 z-50 py-3 transition-all duration-300 text-base-100 ${
        isScrolled ? "bg-black/80 backdrop-blur-[10px]" : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-medium">
            <img src={logo?.logo} alt="logo" className="w-32" />
          </Link>

          <nav className="space-x-8 hidden md:flex">{navLinks}</nav>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-black text-white shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-secondary">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4">{navLinks}</nav>
      </div>

      {/* Backdrop Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 h-screen w-screen"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
