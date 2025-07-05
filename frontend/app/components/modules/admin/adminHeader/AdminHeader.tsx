import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { TbWorldWww } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link } from "react-router";

interface AdminHeaderProps {
  setSidebar: (value: boolean) => void;
}

export default function AdminHeader({ setSidebar }: AdminHeaderProps) {
  const { loggedUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <header className="bg-base-100 px-6 py-3 text-neutral shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(true)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>
          <Link
            to="/"
            className="flex items-center gap-1 text-[15px] duration-300 hover:text-secondary"
            target="_blank"
          >
            <TbWorldWww className="text-xl" />
            Visit Website
          </Link>
        </div>
      </div>
    </header>
  );
}
