
import { IconType } from "react-icons";
import { FiDollarSign, FiHome } from "react-icons/fi";

import { MdOutlineInventory } from "react-icons/md";
import Link from "next/link";
import { FaPen, FaUserEdit, FaUserClock } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbClockCheck } from "react-icons/tb";



export const RouteSelectAdmin = () => {
  return (
    <ul>
      <TransitionLink Icon={FiHome} title="Inicio" href="/"/>
      <TransitionLink Icon={TbClockCheck} title="Reloj checador" href="/protected/registro_checador"/>
      <TransitionLink Icon={FaUserClock} title="Consultar Checador" href="/protected/consultar_checador" />
      <TransitionLink Icon={FaRegPenToSquare} title="Registro de Conceptos" href="/protected/registro_productos" />
      <TransitionLink Icon={FaPen} title="Datos Usuario" href="/protected/registro_datos_usuario" />
      <TransitionLink Icon={FaUserEdit} title="Registro Clientes" href="/protected/registro_clientes" />
      <TransitionLink Icon={RiContactsBook3Line} title="Catalogo de Clientes" href="/protected/catalogo_clientes" />
      <TransitionLink Icon={MdOutlineInventory} title="Config Honorarios" href="/protected/config_clientes_honorarios" />

      <TransitionLink Icon={LuNotebookText} title="Catalogo de Productos" href="#" />
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
  return (
    <li>
      <Link href={href} className={`flex items-center p-2 text-gray-900 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
        <Icon/>
        <span className="ms-3">{title}</span>
      </Link>
    </li>
    
  );
};

      //<TransitionLink Icon={FiLink} selected={false} title="Registro de Usuario" href="/register"/>
