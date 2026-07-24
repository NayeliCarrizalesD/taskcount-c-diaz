
"use client";

import React from "react";
import { useSidebar } from "../context/SidebarContext";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";

export function TopBar() {
    const { toggleSidebar, isCollapsed } = useSidebar();

    return (
        <div
            className={`fixed top-0 right-0 z-30 flex items-center bg-slate-900 border-b border-zinc-800/80 h-16 transition-all duration-300 ease-in-out ${
                isCollapsed ? "left-[70px]" : "left-[260px]"
            }`}
        >
            <div className="px-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg text-zinc-400 hover:text-slate-100 hover:bg-zinc-800/50 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-700"
                >
                    <span className="sr-only">Toggle sidebar</span>
                    {isCollapsed ? <LuPanelLeftOpen size={18} /> : <LuPanelLeftClose size={18} />}
                </button>
            </div>
            <div className="flex-1 px-4">
                <span className="font-semibold text-sm tracking-wide text-slate-200 uppercase">Panel de Control</span>
            </div>
        </div>
    );
}
