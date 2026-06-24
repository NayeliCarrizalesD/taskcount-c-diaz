import SelectCorreos from "../selectUsuarios";

export function FormDatosUsuario({
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
        <div>
          <label
            htmlFor="fecha_alta"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            fecha alta
          </label>
          <input
            id="fecha_alta"
            name="fecha_alta"
            type="date"
            required
            className="w-full mt-1 px-3.5 py-2 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
          />
        </div>
        <div>
          <label
            htmlFor="telefono_usuario"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            Telefono
          </label>
          <input
            id="telefono_usuario"
            name="telefono_usuario"
            required
            className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
          />
        </div>  
        <div>
          <label
            htmlFor="correo"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            Correo
          </label>
          <SelectCorreos/>
          
        </div>   
        <div>
          <label
            htmlFor="nivel"
            className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1"
          >
            Nivel
          </label>
          <select
            id="nivel"
            name="nivel"
            required
            className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
          >
                <option value={""}>Seleccione una opción</option>
                <option value={"na1"}>Administrador</option>
                <option value={"n1"}>Nivel 1</option>
                <option value={"n2"}>Nivel 2</option>
                <option value={"n3"}>Nivel 3</option>
            </select>
        </div>
        
        {children}
      </form>
    );
}