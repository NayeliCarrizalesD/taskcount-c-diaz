"use client";

import { Plan } from "../plan";
import { AccountAdminToggle } from "../account_Admin_Toggle";
import { RouteSelectNivel1 } from "./routeSelectN1";
import { useSidebar } from "../../../context/SidebarContext";

export function SideBarN1() {
  const { isCollapsed } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-black dark:bg-black
        ${isCollapsed ? "w-20" : "w-64"}
        `}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto text-white overflow-x-hidden">
        <div className={`${isCollapsed ? "justify-center flex" : ""}`}>
          <AccountAdminToggle />
        </div>

        <div className="mt-4">
          <RouteSelectNivel1 />
        </div>

        <div className={`mt-auto ${isCollapsed ? "hidden" : "block"}`}>
          <Plan />
        </div>
      </div>
    </aside>
  );
}