"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { LuChevronsUpDown, LuChevronRight, LuLogOut } from "react-icons/lu";
import { FaYinYang } from "react-icons/fa";
import { logoutAction } from "../actions";
import { useSidebar } from "../context/SidebarContext";

// Sidebar Container (Full height)
export const SidebarContainer = ({
  children,
  isCollapsed,
}: {
  children: React.ReactNode;
  isCollapsed: boolean;
}) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-[#09090b] border-r border-zinc-800/40 flex flex-col p-3 select-none ${
        isCollapsed ? "w-[70px]" : "w-[260px]"
      }`}
      aria-label="Sidebar"
    >
      {children}
    </aside>
  );
};

// Sidebar Header (Organization switcher)
export const SidebarHeader = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <div className={`flex items-center p-2 mb-6 border-b border-zinc-800/30 pb-4 ${isCollapsed ? "justify-center" : "justify-between"}`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center text-zinc-200 shadow-md shrink-0">
          <FaYinYang size={16} />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-xs text-zinc-100 truncate leading-tight uppercase tracking-wide">
              CARRIZALES DIAZ
            </span>
            <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider leading-none mt-1">
              Despacho Contable
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Sidebar Group (Section headers)
export const SidebarGroup = ({
  title,
  children,
  isCollapsed,
}: {
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
}) => {
  return (
    <div className="mb-5">
      {!isCollapsed && (
        <span className="px-2 text-[10px] font-bold text-zinc-500 tracking-widest uppercase block mb-2 leading-none">
          {title}
        </span>
      )}
      <ul className="space-y-1">{children}</ul>
    </div>
  );
};

// Sidebar Item (Supports links and collapsible sub-menus)
export const SidebarItem = ({
  title,
  href,
  Icon,
  subItems,
}: {
  title: string;
  href?: string;
  Icon: IconType;
  subItems?: { title: string; href: string; Icon?: IconType }[];
}) => {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  const hasSubItems = subItems && subItems.length > 0;

  // Check if any sub-item is active to auto-expand
  const hasActiveSubItem = subItems?.some((sub) => pathname === sub.href);
  const isDirectActive = href ? pathname === href : false;

  useEffect(() => {
    if (hasActiveSubItem && !isCollapsed) {
      setIsOpen(true);
    }
  }, [hasActiveSubItem, isCollapsed]);

  useEffect(() => {
    if (isCollapsed) {
      setIsOpen(false);
    }
  }, [isCollapsed]);

  if (hasSubItems) {
    return (
      <li className="list-none">
        <button
          onClick={() => !isCollapsed && setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 group relative text-left ${
            hasActiveSubItem
              ? "text-zinc-100 font-medium bg-zinc-900/50"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
          }`}
        >
          <div className="flex items-center min-w-0">
            <Icon className={`text-lg transition-colors min-w-[20px] ${hasActiveSubItem ? "text-zinc-100" : ""}`} />
            <span
              className={`ms-3 transition-all duration-300 whitespace-nowrap truncate ${
                isCollapsed ? "opacity-0 w-0 pointer-events-none hidden" : "opacity-100"
              }`}
            >
              {title}
            </span>
          </div>
          {!isCollapsed && (
            <LuChevronRight
              className={`text-zinc-500 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-90" : ""}`}
              size={14}
            />
          )}
          {isCollapsed && (
            <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-zinc-950 text-white text-xs font-semibold invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap shadow-md border border-zinc-800/40">
              {title}
            </span>
          )}
        </button>

        {/* Collapsible Sub-menu using grid height transition */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen && !isCollapsed ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 overflow-hidden"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="pl-4 ml-4.5 border-l border-zinc-800/60 space-y-1">
              {subItems.map((sub, idx) => {
                const isSubActive = pathname === sub.href;
                const SubIcon = sub.Icon;
                return (
                  <li key={idx} className="list-none">
                    <Link
                      href={sub.href}
                      className={`flex items-center p-2 rounded-lg text-sm transition-all duration-200 ${
                        isSubActive
                          ? "bg-zinc-900 text-zinc-100 font-medium shadow-sm border border-zinc-800/30"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
                      }`}
                    >
                      {SubIcon && <SubIcon className="mr-2 text-md" />}
                      <span>{sub.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="list-none">
      <Link
        href={href || "#"}
        className={`flex items-center p-2 rounded-lg transition-all duration-200 group relative ${
          isDirectActive
            ? "bg-zinc-900 text-zinc-100 font-medium shadow-sm border border-zinc-800/30"
            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
        }`}
      >
        <Icon className={`text-lg transition-colors min-w-[20px] ${isDirectActive ? "text-zinc-100" : ""}`} />
        <span
          className={`ms-3 transition-all duration-300 whitespace-nowrap truncate ${
            isCollapsed ? "opacity-0 w-0 pointer-events-none hidden" : "opacity-100"
          }`}
        >
          {title}
        </span>
        {isCollapsed && (
          <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-zinc-950 text-white text-xs font-semibold invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap shadow-md border border-zinc-800/40">
            {title}
          </span>
        )}
      </Link>
    </li>
  );
};

// Sidebar Footer (User details + option popup)
export const SidebarFooter = ({
  name,
  email,
  isCollapsed,
}: {
  name?: string | null;
  email?: string | null;
  isCollapsed: boolean;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (userName?: string | null) => {
    if (!userName) return "U";
    const parts = userName.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className="relative mt-auto border-t border-zinc-800/40 pt-4" ref={dropdownRef}>
      {dropdownOpen && (
        <div className={`absolute bottom-full left-0 mb-2 w-full bg-[#09090b] border border-zinc-800/50 rounded-lg shadow-xl py-1.5 z-50 text-sm ${isCollapsed ? "min-w-[160px]" : ""}`}>
          <div className="px-3 py-2 border-b border-zinc-800/30">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Conectado como</p>
            <p className="font-semibold text-zinc-200 truncate mt-0.5">{name || "Usuario"}</p>
          </div>
          <button
            onClick={async () => {
              await logoutAction();
            }}
            className="w-full text-left px-3 py-2.5 text-red-400 hover:bg-zinc-900/60 hover:text-red-300 flex items-center gap-2 transition-colors font-medium text-xs uppercase tracking-wider"
          >
            <LuLogOut size={14} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`w-full flex items-center gap-3 p-1.5 rounded-lg hover:bg-zinc-900/40 transition-colors text-left group relative ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-zinc-850 flex items-center justify-center text-zinc-300 font-semibold text-sm shrink-0 border border-zinc-800/50 uppercase">
            {initials}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-medium text-xs text-zinc-200 truncate leading-tight">
                {name || "Usuario"}
              </span>
              <span className="text-zinc-500 text-[10px] truncate leading-none mt-1">
                {email || ""}
              </span>
            </div>
          )}
        </div>
        {!isCollapsed && <LuChevronsUpDown className="text-zinc-500 shrink-0" size={14} />}
        {isCollapsed && (
          <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-zinc-950 text-white text-xs font-semibold invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap shadow-md border border-zinc-800/40">
            {name || "Usuario"}
          </span>
        )}
      </button>
    </div>
  );
};
