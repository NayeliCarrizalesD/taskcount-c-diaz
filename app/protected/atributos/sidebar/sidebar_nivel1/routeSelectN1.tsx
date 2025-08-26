'use client';
import { IconType } from "react-icons";
import { MdOutlineInventory } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { TbClockCheck } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";

export const RouteSelectNivel1 = () => {
  return (
    <div className="space-y-1">
      <TransitionLink Icon={FiHome} title="Inicio" href="/" />
      <TransitionLink Icon={TbClockCheck} title="Reloj checador" href="/protected/registro_checador" />
      <TransitionLink Icon={FaUserEdit} title="Registro Clientes" href="/protected/registro_clientes" />
      <TransitionLink Icon={RiContactsBook3Line} title="Catalogo de Clientes" href="/protected/catalogo_clientes" />
      <TransitionLink Icon={MdOutlineInventory} title="Config Honorarios" href="/protected/config_clientes_honorarios" />
    </div>
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
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center p-2 rounded-full group transition-colors duration-200 ${isActive
            ? "bg-blue-600 text-white dark:bg-blue-500"
            : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
      >
        <Icon className={`transition-colors duration-200 ${isActive ? "text-white" : ""}`} />
        <span className="ms-3">{title}</span>
      </Link>
    </li>
  );
};

      //<TransitionLink Icon={FiLink} selected={false} title="Registro de Usuario" href="/register"/>
