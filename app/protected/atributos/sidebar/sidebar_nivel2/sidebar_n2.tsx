"use client";

import { useSidebar } from "../../../context/SidebarContext";
import { SidebarContainer, SidebarHeader, SidebarFooter, SidebarGroup, SidebarItem } from "../../../components/SidebarComponents";
import { FiHome, FiDollarSign } from "react-icons/fi";
import { GrDeliver } from "react-icons/gr";
import { MdOutlineInventory } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";

export function SideBarN2({ name, email }: { name?: string | null, email?: string | null }) {
  const { isCollapsed } = useSidebar();

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <SidebarHeader isCollapsed={isCollapsed} />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-4 pr-1 scrollbar-thin">
        <SidebarGroup title="Plataforma" isCollapsed={isCollapsed}>
          <SidebarItem title="Inicio" href="/" Icon={FiHome} />
        </SidebarGroup>

        <SidebarGroup title="Ventas & Stock" isCollapsed={isCollapsed}>
          <SidebarItem 
            title="Gestión" 
            Icon={MdOutlineInventory}
            subItems={[
              { title: "Cotizador", href: "/protected/cotizador", Icon: FiDollarSign },
              { title: "Consultar Fletes", href: "/protected/consultar_flete", Icon: GrDeliver },
              { title: "Inventario", href: "/protected/inventario", Icon: MdOutlineInventory },
              { title: "Catálogo Productos", href: "/protected/catalogo_productos", Icon: LuNotebookText }
            ]}
          />
        </SidebarGroup>
      </div>

      <SidebarFooter name={name} email={email} isCollapsed={isCollapsed} />
    </SidebarContainer>
  );
}