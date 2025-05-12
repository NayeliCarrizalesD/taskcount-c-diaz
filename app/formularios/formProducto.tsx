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
            htmlFor="nombre_producto"
            className="block text-xs uppercase"
          >
            nombre servicio / producto
          </label>
          <input
            id="nombre_producto"
            name="nombre_producto"
            required
            className="mt-1 placeholder-gray-700 shadow-sm focus:outline-none sm:text-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
           
        </div>
        <div>
          <label
            htmlFor="empresa_producto"
            className="block text-xs uppercase"
          >
            tipo de 
          </label>
          <select
            
            id="empresa_producto"
            name="empresa_producto"
            required
            className="mt-1 block w-full text-black appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          >
            <option value={""}>Seleccione una opción</option>
            <option value={"MGO Industrial"}>MGO Industrial</option>
            <option value={"Quimica OB"}>Quimica OB</option>
            <option value={"MGO Overseas"}>MGO Overseas</option>
          </select>
           
        </div>
        <div>
          <label
            htmlFor="correo_empleado"
            className="block text-xs uppercase"
          >
            correo empleado 
          </label>
          <InputCorreoUsuario/>
        
        </div>
        <div>
          <label
            htmlFor="clave_sat"
            className="block text-xs uppercase"
          >
            clave sat 
          </label>
          <input
          type="text"
            id="clave_sat"
            name="clave_sat"
            className="mt-1 block w-full text-black rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            /> 
        
        </div>
        <div>
          <label
            htmlFor="categoria"
            className="block text-xs uppercase"
          >
            categoria 
          </label>
          <select
            id="categoria"
            name="categoria"

            className="mt-1 block w-full text-black rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            >
            <option value={""}>Seleccione una opción</option>
            <option value={"Aceite"}>Aceite</option>
            <option value={"Automotríz"}>Automotríz</option>
            <option value={"Componente"}>Componente</option>
            <option value={"Industrial"}>Industrial</option>
            <option value={"Otros"}>Otros</option>
          </select>
        
        </div>
        <div>
          <label
            htmlFor="subcategoria"
            className="block text-xs uppercase"
          >
            subcategoria 
          </label>
          <input
            type="text"
            id="subcategoria"
            name="subcategoria"

            className="mt-1 block w-full text-black rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
            
        
        </div>

        {children}
      </form>
    );
  }
  