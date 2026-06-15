
"use client";

import React from "react";
import { useSidebar } from "../context/SidebarContext";
import { FaBars } from "react-icons/fa";

export function TopBar() {
    const { toggleSidebar, isCollapsed } = useSidebar();

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 flex items-center bg-zinc-800 shadow-md border-b border-zinc-700 h-16 transition-all duration-300 ease-in-out"
        >
            <div className="px-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                >
                    <span className="sr-only">Toggle sidebar</span>
                    <FaBars size={20} />
                </button>
            </div>
            <div className="flex-1 px-4">
                {/* Breadcrumbs or Title could go here */}
                <span className="font-semibold text-zinc-100">Panel de Control</span>
            </div>
        </div>
    );
}
