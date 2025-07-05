import type { ReactNode } from "react";

export interface ISidebarSubItem {
  title: string;
  path?: string;
  subSubMenu?: { title: string; path: string }[];
}

export interface ISidebarMenu {
  icon: ReactNode;
  title: string;
  path?: string;
  subMenu?: ISidebarSubItem[];
}

export interface ISidebarItem {
  title: string;
  menu: ISidebarMenu[];
}
