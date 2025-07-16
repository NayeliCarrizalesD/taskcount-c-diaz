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
            className="block text-xs uppercase"
          >
            nombre servicio / producto
          </label>
          <input
            id="nombre_producto_servicio"
            name="nombre_producto_servicio"
            required
            className="mt-1 placeholder-gray-700 shadow-sm focus:outline-none sm:text-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
           
        </div>
        
        <div>
          
          <InputCorreoUsuario/>
        
        </div>
        {children}
      </form>
    );
  }
  