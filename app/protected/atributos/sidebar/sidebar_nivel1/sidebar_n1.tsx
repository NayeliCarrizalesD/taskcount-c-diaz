"use client";

import { useSidebar } from "../../../context/SidebarContext";
import { SidebarContainer, SidebarHeader, SidebarFooter, SidebarGroup, SidebarItem } from "../../../components/SidebarComponents";
import { FiHome } from "react-icons/fi";
import { TbClockCheck } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";

export function SideBarN1({ name, email }: { name?: string | null, email?: string | null }) {
  const { isCollapsed } = useSidebar();

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <SidebarHeader isCollapsed={isCollapsed} />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-4 pr-1 scrollbar-thin">
        <SidebarGroup title="Plataforma" isCollapsed={isCollapsed}>
          <SidebarItem title="Inicio" href="/" Icon={FiHome} />
        </SidebarGroup>

        <SidebarGroup title="Checador" isCollapsed={isCollapsed}>
          <SidebarItem title="Reloj Checador" href="/protected/registro_checador" Icon={TbClockCheck} />
        </SidebarGroup>

        <SidebarGroup title="Clientes" isCollapsed={isCollapsed}>
          <SidebarItem 
            title="Clientes" 
            Icon={RiContactsBook3Line}
            subItems={[
              { title: "Registro Clientes", href: "/protected/registro_clientes", Icon: FaUserEdit },
              { title: "Catálogo de Clientes", href: "/protected/catalogo_clientes" }
            ]}
          />
        </SidebarGroup>

        <SidebarGroup title="Conceptos" isCollapsed={isCollapsed}>
          <SidebarItem title="Config Concepto" href="/protected/config_clientes_honorarios" Icon={MdOutlineInventory} />
        </SidebarGroup>
      </div>

      <SidebarFooter name={name} email={email} isCollapsed={isCollapsed} />
    </SidebarContainer>
  );
}