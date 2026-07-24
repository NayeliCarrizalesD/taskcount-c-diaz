"use client";

import { useSidebar } from "../../../context/SidebarContext";
import { SidebarContainer, SidebarHeader, SidebarFooter, SidebarGroup, SidebarItem } from "../../../components/SidebarComponents";
import { FiHome } from "react-icons/fi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";

export function SideBarN3({ name, email }: { name?: string | null, email?: string | null }) {
  const { isCollapsed } = useSidebar();

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <SidebarHeader isCollapsed={isCollapsed} />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-4 pr-1 scrollbar-thin">
        <SidebarGroup title="Plataforma" isCollapsed={isCollapsed}>
          <SidebarItem title="Inicio" href="/" Icon={FiHome} />
        </SidebarGroup>

        <SidebarGroup title="Productos" isCollapsed={isCollapsed}>
          <SidebarItem 
            title="Productos" 
            Icon={LuNotebookText}
            subItems={[
              { title: "Registro Productos", href: "/protected/registro_productos", Icon: FaRegPenToSquare },
              { title: "Catálogo Productos", href: "/protected/catalogo_productos" }
            ]}
          />
        </SidebarGroup>
      </div>

      <SidebarFooter name={name} email={email} isCollapsed={isCollapsed} />
    </SidebarContainer>
  );
}