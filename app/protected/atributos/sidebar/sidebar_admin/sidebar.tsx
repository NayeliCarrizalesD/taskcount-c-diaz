"use client";

import { useSidebar } from "../../../context/SidebarContext";
import { SidebarContainer, SidebarHeader, SidebarFooter, SidebarGroup, SidebarItem } from "../../../components/SidebarComponents";
import { FiHome } from "react-icons/fi";
import { TbClockCheck } from "react-icons/tb";
import { FaUserClock, FaTasks, FaPlusSquare, FaPen, FaUserEdit } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";

export function SideBarAdmin({ name, email }: { name?: string | null, email?: string | null }) {
  const { isCollapsed } = useSidebar();

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <SidebarHeader isCollapsed={isCollapsed} />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-4 pr-1 scrollbar-thin">
        <SidebarGroup title="Plataforma" isCollapsed={isCollapsed}>
          <SidebarItem title="Inicio" href="/" Icon={FiHome} />
        </SidebarGroup>

        <SidebarGroup title="Checador" isCollapsed={isCollapsed}>
          <SidebarItem 
            title="Checador" 
            Icon={TbClockCheck}
            subItems={[
              { title: "Reloj Checador", href: "/protected/registro_checador", Icon: TbClockCheck },
              { title: "Consultar Checador", href: "/protected/consultar_checador", Icon: FaUserClock }
            ]}
          />
        </SidebarGroup>

        <SidebarGroup title="Clientes" isCollapsed={isCollapsed}>
          <SidebarItem 
            title="Clientes" 
            Icon={RiContactsBook3Line}
            subItems={[
              { title: "Registro Clientes", href: "/protected/registro_clientes", Icon: FaUserEdit },
              { title: "Catálogo de Clientes", href: "/protected/catalogo_clientes", Icon: RiContactsBook3Line }
            ]}
          />
        </SidebarGroup>

        <SidebarGroup title="Conceptos" isCollapsed={isCollapsed}>
          <SidebarItem 
            title="Conceptos" 
            Icon={MdOutlineInventory}
            subItems={[
              { title: "Registro de Conceptos", href: "/protected/registro_productos", Icon: FaRegPenToSquare },
              { title: "Config Concepto", href: "/protected/config_clientes_honorarios", Icon: MdOutlineInventory },
              { title: "Pago Honorarios", href: "/protected/registro_pago_honorarios", Icon: LuNotebookText }
            ]}
          />
        </SidebarGroup>

        <SidebarGroup title="Tareas" isCollapsed={isCollapsed}>
          <SidebarItem 
            title="Tareas" 
            Icon={FaTasks}
            subItems={[
              { title: "Ver Tareas", href: "/protected/tareas", Icon: FaTasks },
              { title: "Asignar Tareas", href: "/protected/tareas/asignar", Icon: FaPlusSquare }
            ]}
          />
        </SidebarGroup>

        <SidebarGroup title="Configuración" isCollapsed={isCollapsed}>
          <SidebarItem title="Datos Usuario" href="/protected/registro_datos_usuario" Icon={FaPen} />
        </SidebarGroup>
      </div>

      <SidebarFooter name={name} email={email} isCollapsed={isCollapsed} />
    </SidebarContainer>
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