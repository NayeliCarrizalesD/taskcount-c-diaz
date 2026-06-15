

import { IconType } from "react-icons";
import { FiDollarSign, FiHome } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import Link from "next/link";
import { GrDeliver } from "react-icons/gr";
import { LuNotebookText } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../../context/SidebarContext";

export const RouteSelectNivel2 = () => {
  return (
    <ul>
      <TransitionLink Icon={FiHome} title="Inicio" href="/" />
      <TransitionLink Icon={FiDollarSign} title="Cotizador" href="/protected/cotizador" />
      <TransitionLink Icon={GrDeliver} title="Consultar Fletes" href="/protected/consultar_flete" />
      <TransitionLink Icon={MdOutlineInventory} title="Inventario" href="/protected/inventario" />
      <TransitionLink Icon={LuNotebookText} title="Catalogo de Productos" href="/protected/catalogo_productos" />
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

