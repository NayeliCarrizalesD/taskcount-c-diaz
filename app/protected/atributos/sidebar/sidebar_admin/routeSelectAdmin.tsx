'use client';

import { IconType } from "react-icons";
import { FiHome } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import Link from "next/link";
import { FaPen, FaUserEdit, FaUserClock } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbClockCheck } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../../context/SidebarContext";

export const RouteSelectAdmin = () => {
  return (
    <ul>
      <TransitionLink Icon={FiHome} title="Inicio" href="/" />
      <TransitionLink Icon={TbClockCheck} title="Reloj checador" href="/protected/registro_checador" />
      <TransitionLink Icon={FaUserClock} title="Consultar Checador" href="/protected/consultar_checador" />
      <TransitionLink Icon={FaRegPenToSquare} title="Registro de Conceptos" href="/protected/registro_productos" />
      <TransitionLink Icon={FaPen} title="Datos Usuario" href="/protected/registro_datos_usuario" />
      <TransitionLink Icon={FaUserEdit} title="Registro Clientes" href="/protected/registro_clientes" />
      <TransitionLink Icon={RiContactsBook3Line} title="Catalogo de Clientes" href="/protected/catalogo_clientes" />
      <TransitionLink Icon={MdOutlineInventory} title="Config Honorarios" href="/protected/config_clientes_honorarios" />
      <TransitionLink Icon={LuNotebookText} title="Pago Honorarios" href="/protected/registro_pago_honorarios" />
    </ul>
  );
};

const TransitionLink = ({
  Icon,
  title,
  href,
}: {
  Icon: IconType;
  title: string;
  href: string;
}) => {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center p-2 group transition-all duration-300 relative ${isActive
          ? "bg-zinc-700 text-white rounded-l-3xl shadow-xl ml-2 -mr-4"
          : "text-white hover:bg-white hover:text-black hover:translate-x-1 rounded-full hover:ml-1"
          }`}
        title={isCollapsed ? title : ""}
      >
        <Icon className={`transition-colors duration-200 min-w-[20px] ${isActive ? "text-white" : ""}`} />
        <span className={`ms-3 transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}>
          {title}
        </span>
      </Link>
    </li>
  );
};