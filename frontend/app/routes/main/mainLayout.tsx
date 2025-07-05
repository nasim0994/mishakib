import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header/Header";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
