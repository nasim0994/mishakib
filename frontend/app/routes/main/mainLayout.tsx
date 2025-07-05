import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header/Header";
import useFluidCursor from "@/components/shared/useFluidCursor";
import { useEffect } from "react";
import { Outlet } from "react-router";

export default function MainLayout() {
  useEffect(() => {
    useFluidCursor();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <div className="fixed top-0 left-0 z-2">
        <canvas id="fluid" className="w-screen h-screen" />
      </div>
    </>
  );
}
