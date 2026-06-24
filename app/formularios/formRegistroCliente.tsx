import { InputCorreoUsuario } from "../protected/atributos/inputCorreoUsuario";
import { MarcaTemporal } from "../protected/atributos/marca_temporal";

export function FormRegistroCliente({
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
        <div className="invisible h-[1px]">
          
          <MarcaTemporal/>
        
        </div>
        <div>
          <label
            htmlFor="nombre_cliente"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            nombre cliente
          </label>
          <input
            type="text"
            id="nombre_cliente"
            name="nombre_cliente"
            required
            className="w-full mt-1 uppercase px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
          />
        </div>
        <div>
          <label
            htmlFor="rfc"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            rfc 
          </label>
          <input
            type="text"
            id="rfc"
            name="rfc"
            className="w-full mt-1 uppercase px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
          /> 
        </div>
        <div>
          <label
            htmlFor="telefono_cliente"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            telefono cliente
          </label>
          <input
            type="number"
            id="telefono_cliente"
            name="telefono_cliente"
            className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
          />
        </div>
        <div>
          <label
            htmlFor="correo_cliente"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            correo cliente 
          </label>
          <input
            type="text"
            id="correo_cliente"
            name="correo_cliente"
            className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
          />
        </div>
        
        <div>
          <InputCorreoUsuario/>
        </div>

        <div>
          <label
            htmlFor="fecha_alta"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            fecha de alta del cliente 
          </label>
          <input
            type="date"
            id="fecha_alta"
            name="fecha_alta"
            className="w-full mt-1 px-3.5 py-2 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
          />
        </div>

        {children}
      </form>
    );
  }
  