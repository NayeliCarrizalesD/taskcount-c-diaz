
"use client";

import React from "react";
import { useSidebar } from "../context/SidebarContext";
import { TopBar } from "./TopBar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode; // The specific sidebar component for the user level
}

export function ProtectedLayout({ children, sidebar }: ProtectedLayoutProps) {
    const { isCollapsed } = useSidebar();

    return (
        <>
            {/* Sidebar Wrapper - Adjusts based on state passed via context implicitly or props?
          Actually, the Sidebars themselves need to consume the context to collapse.
          But we can control the container here too if needed, but sidebars usually are fixed.
          We just render the sidebar here.
       */}
            <div className={`fixed top-0 left-0 h-screen z-40 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
                {sidebar}
            </div>

            <TopBar />

            <div
                className={`p-4 mt-16 transition-all duration-300 ease-in-out ${isCollapsed ? "ml-20" : "ml-64"
                    }`}
            >
                {children}
            </div>
        </>
    );
}
