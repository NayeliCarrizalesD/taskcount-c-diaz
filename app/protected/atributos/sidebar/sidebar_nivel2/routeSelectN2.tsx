
import { IconType } from "react-icons";
import { FiDollarSign, FiHome } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
import Link from "next/link";
import { GrDeliver } from "react-icons/gr";
import { LuNotebookText } from "react-icons/lu";


export const RouteSelectNivel2 = () => {
  return (
    <div className="space-y-1">
      <TransitionLink Icon={FiHome} title="Inicio" href="/"/>
      <TransitionLink Icon={FiDollarSign} title="Cotizador" href="/protected/cotizador" />
      <TransitionLink Icon={GrDeliver} title="Consultar Fletes" href="/protected/consultar_flete" />
      <TransitionLink Icon={MdOutlineInventory} title="Inventario" href="/protected/inventario" />
      <TransitionLink Icon={LuNotebookText } title="Catalogo de Productos" href="/protected/catalogo_productos" />
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
  return (
    <Link href={href}
      className={`flex items-center justify-start gap-2 w-full rounded-full px-2 py-1.5 text-sm text-stone-50 transition-[box-shadow,_background-color,_color] hover:bg-slate-200 bg-transparent hover:text-stone-900 shadow-none `}
    >
      <Icon />
      <span>{title}</span>
    </Link>
  );
};

