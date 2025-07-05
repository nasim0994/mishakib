import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header/Header";
import useFluidCursor from "@/components/shared/useFluidCursor";
import { useEffect } from "react";
import { Outlet } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MainLayout() {
  useEffect(() => {
    useFluidCursor();

    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />

      <div className="fixed top-0 left-0 z-10 pointer-events-none opacity-40">
        <canvas id="fluid" className="w-screen h-screen" />
      </div>
    </>
  );
}
