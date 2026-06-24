import { InputCorreoUsuario } from "../protected/atributos/inputCorreoUsuario";
import { MarcaTemporal } from "../protected/atributos/marca_temporal";

export function FormRegistroProductos({
    action,
    children,
  }: {
    action: any;
    children: React.ReactNode;
  }) {
    return (
      <form
        action={action}
        className="flex flex-col space-y-4 bg-slate-800 px-2 py-5 sm:px-4"
      >
        <div className="invisible h-[1px]" >
          
          <MarcaTemporal/>
        
        </div>
        
        <div>
          <label
            htmlFor="nombre_producto_servicio"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            nombre servicio / producto
          </label>
          <input
            id="nombre_producto_servicio"
            name="nombre_producto_servicio"
            required
            className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
          />
           
        </div>
        
        <div>
          
          <InputCorreoUsuario/>
        
        </div>
        {children}
      </form>
    );
  }
  