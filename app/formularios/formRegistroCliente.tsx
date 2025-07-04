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
            className="block text-xs uppercase"
          >
            nombre cliente
          </label>
          <input
            type="text"
            id="nombre_cliente"
            name="nombre_cliente"
            required
            className="mt-1 block uppercase w-full text-black appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="rfc"
            className="block text-xs uppercase"
          >
            rfc 
          </label>
          <input
          type="text"
            id="rfc"
            name="rfc"
            className="mt-1 block uppercase w-full text-black rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            /> 
        </div>
        <div>
          <label
            htmlFor="telefono_cliente"
            className="block text-xs uppercase"
          >
            telefono cliente
          </label>
          <input
          type="number"
            id="telefono_cliente"
            name="telefono_cliente"
            className="mt-1 uppercase block w-full text-black rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="correo_cliente"
            className="block text-xs uppercase"
          >
            correo cliente 
          </label>
          <input
            type="text"
            id="correo_cliente"
            name="correo_cliente"
            className="mt-1 block w-full text-black rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
        </div>
        
        <div>
          <label
            htmlFor="correo_empleado"
            className="block text-xs uppercase"
          >
            correo de la persona que registra al cliente 
          </label>
          <InputCorreoUsuario/>
        </div>

        <div>
          <label
            htmlFor="fecha_alta"
            className="block text-xs uppercase"
          >
            fecha de alta del cliente 
          </label>
          <input
            type="date"
            id="fecha_alta"
            name="fecha_alta"
            className="mt-1 block w-full text-black rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
        </div>

        {children}
      </form>
    );
  }
  