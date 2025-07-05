import "@/assets/css/admin.css";
import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import AdminSidebar from "@/components/modules/admin/adminSidebar/AdminSidebar";
import { useAppSelector } from "@/redux/hooks";
import AdminHeader from "@/components/modules/admin/adminHeader/AdminHeader";

export default function AdminLayout() {
  const [sidebar, setSidebar] = useState(false);
  const { loggedUser } = useAppSelector((store) => store.auth);

  // if (!loggedUser || loggedUser.role !== "admin") {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="flex items-start">
      <aside className={`admin_sidebar ${sidebar && "admin_sidebar_show"}`}>
        <AdminSidebar />
      </aside>
      {sidebar && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setSidebar(false)}
        />
      )}
      <div className="admin_content">
        <AdminHeader setSidebar={setSidebar} />
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
