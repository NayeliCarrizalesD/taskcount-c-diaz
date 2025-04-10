
import { IconType } from "react-icons";
import { FiDollarSign, FiHome } from "react-icons/fi";
import { GrDeliver } from "react-icons/gr";
import { MdOutlineInventory } from "react-icons/md";
import Link from "next/link";
import { FaPen, FaUserEdit } from "react-icons/fa";
import { LuPackage, LuNotebookText } from "react-icons/lu";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";


export const RouteSelectAdmin = () => {
  return (
    <div className="space-y-1">
      <TransitionLink Icon={FiHome} title="Inicio" href="/"/>
      <TransitionLink Icon={LuPackage} title="Registrar Flete" href="/protected/registro_flete"/>
      <TransitionLink Icon={FiDollarSign} title="Cotizador" href="/protected/cotizador" />
      <TransitionLink Icon={GrDeliver} title="Consultar Fletes" href="/protected/consultar_flete" />
      <TransitionLink Icon={MdOutlineInventory} title="Inventario" href="/protected/inventario" />
      <TransitionLink Icon={FaPen} title="Datos Usuario" href="/protected/registro_datos_usuario" />
      <TransitionLink Icon={FaRegPenToSquare} title="Registro Productos" href="/protected/registro_productos" />
      <TransitionLink Icon={LuNotebookText} title="Catalogo de Productos" href="/protected/catalogo_productos" />
      <TransitionLink Icon={FaUserEdit} title="Registro Clientes" href="/protected/registro_clientes" />
      <TransitionLink Icon={RiContactsBook3Line} title="Catalogo de Clientes" href="/protected/catalogo_clientes" />
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
      <span className="sm:appearance-none">{title}</span>
    </Link>
  );
};

      //<TransitionLink Icon={FiLink} selected={false} title="Registro de Usuario" href="/register"/>
