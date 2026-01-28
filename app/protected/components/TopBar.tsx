
"use client";

import React from "react";
import { useSidebar } from "../context/SidebarContext";
import { FaBars } from "react-icons/fa";

export function TopBar() {
    const { toggleSidebar, isCollapsed } = useSidebar();

    return (
        <div
            className={`fixed top-0 right-0 z-30 flex items-center bg-white shadow-sm border-b dark:bg-gray-800 dark:border-gray-700 h-16 transition-all duration-300 ease-in-out
        ${isCollapsed ? "left-20" : "left-64"}
        `}
        >
            <div className="px-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Toggle sidebar</span>
                    <FaBars size={20} />
                </button>
            </div>
            <div className="flex-1 px-4">
                {/* Breadcrumbs or Title could go here */}
                <span className="font-semibold text-gray-700 dark:text-gray-200">Panel de Control</span>
            </div>
        </div>
    );
}
