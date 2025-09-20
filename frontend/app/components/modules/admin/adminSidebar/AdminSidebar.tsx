import { BiBookAlt } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { IoStorefrontOutline } from "react-icons/io5";
import { TbShoppingBagCheck } from "react-icons/tb";
import { CgSearchFound } from "react-icons/cg";
import { MdMonitor } from "react-icons/md";

import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { userLogout } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import type { ISidebarItem } from "@/interface/sidebarInterface";
import SidebarItems from "./SidebarItems";
import { useGetLogoQuery } from "@/redux/features/logo/logoApi";

const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    menu: [
      {
        icon: <BiCategory />,
        title: "Dashboard",
        path: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Contact",
    menu: [
      {
        icon: <BiBookAlt />,
        title: "About",
        path: "/admin/about",
      },
      {
        icon: <BiBookAlt />,
        title: "Contact",
        path: "/admin/contact",
      },
      {
        icon: <BiBookAlt />,
        title: "Social Link",
        path: "/admin/social/all",
      },
      {
        icon: <BiBookAlt />,
        title: "Counter",
        path: "/admin/counter/all",
      },
    ],
  },
  {
    title: "Service",
    menu: [
      {
        icon: <TbShoppingBagCheck />,
        title: "All Services",
        path: "/admin/service/all",
      },
    ],
  },
  {
    title: "Skill",
    menu: [
      {
        icon: <RiAdminFill />,
        title: "My Skills",
        path: "/admin/skill",
      },
    ],
  },
  {
    title: "Project",
    menu: [
      {
        icon: <IoStorefrontOutline />,
        title: "Project Category",
        path: "/admin/project/category/all",
      },
      {
        icon: <IoStorefrontOutline />,
        title: "All Projects",
        path: "/admin/project/all",
      },
    ],
  },
  {
    title: "Setting",
    menu: [
      { icon: <MdMonitor />, title: "Logo", path: "/admin/setting/logo" },
      {
        icon: <CgSearchFound />,
        title: "SEO",
        path: "/admin/setting/seo",
      },
    ],
  },
];

export default function AdminSidebar() {
  const { loggedUser } = useAppSelector((store) => store.auth);
  const user = loggedUser;
  const dispatch = useDispatch();

  const { data } = useGetLogoQuery({});
  const logo = data?.data?.logo;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="sidebar_menu">
        <Link to="/admin/dashboard">
          <img
            src={logo}
            alt="logo"
            className="mx-auto my-3 w-24 sm:w-32 bg-primary"
          />
        </Link>

        <nav className="admin_sidebar_item flex flex-col gap-3">
          {adminSidebarItems?.map((item, i) => (
            <ul key={i}>
              <h3 className="pb-2 text-[13px] uppercase text-neutral/60">
                {item?.title}
              </h3>
              {item?.menu?.map((menu, i) => (
                <SidebarItems key={i} item={menu} />
              ))}
            </ul>
          ))}
        </nav>
      </div>

      <div className="border-t py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img
              src="/images/demo_user.jpg"
              alt="user"
              className="h-8 w-8 rounded-full"
            />
            <div>
              <h3 className="font-medium">{user?.name}</h3>
              <p className="-mt-px text-xs text-neutral-content">
                {user?.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const isConfirm = window.confirm(
                "Are you sure you want to logout?"
              );
              if (isConfirm) {
                dispatch(userLogout());
              }
            }}
            className="rounded bg-red-100 px-3 py-1.5 text-[13px] text-red-500 duration-300 hover:bg-red-500 hover:text-base-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
