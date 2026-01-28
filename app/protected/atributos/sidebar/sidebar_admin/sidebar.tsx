"use client";

import { Plan } from "../plan";
import { AccountAdminToggle } from "../account_Admin_Toggle";
import { RouteSelectAdmin } from "./routeSelectAdmin";
import { useSidebar } from "../../../context/SidebarContext";

export function SideBarAdmin({ name, email }: { name?: string | null, email?: string | null }) {
  const { isCollapsed } = useSidebar();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-black dark:bg-black
        ${isCollapsed ? "w-20" : "w-64"}
        `}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto text-white overflow-x-hidden">
        {/* Account Toggle could also be adjusted or hidden */}
        <div className={`${isCollapsed ? "justify-center flex" : ""}`}>
          <AccountAdminToggle name={name} email={email} />
        </div>

        <div className="mt-4">
          <RouteSelectAdmin />
        </div>

        <div className={`mt-auto ${isCollapsed ? "hidden" : "block"}`}>
          <Plan />
        </div>
      </div>
    </aside>
  );
}


/*
<div className="font-[family-name:var(--font-geist-mono)] w-[200px]">   
      <div className="overflow-y bg-black text-white sticky top-4 h-[calc(100vh-32px-48px)]" >
        <AccountAdminToggle/>
        <RouteSelectAdmin/> 
      </div>
      <Plan/>
    </div>
*/