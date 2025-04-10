import SelectCorreos from "./selectUsuarios";

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
        className="flex flex-col space-y-4 bg-zinc-800 px-2 py-5 sm:px-4"
      >
        <div>
          <label
            htmlFor="nombre"
            className="block text-xs text-white uppercase"
          >
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            required
            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="apellido"
            className="block text-xs text-white uppercase"
          >
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            required
            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>     
        <div>
          <label
            htmlFor="nivel"
            className="block text-xs text-white uppercase"
          >
            Nivel
          </label>
          <select
            id="nivel"
            name="nivel"
            required
            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          >
                <option value={""}>Seleccione una opción</option>
                <option value={"na1"}>Administrador</option>
                <option value={"n1"}>Nivel 1</option>
                <option value={"n2"}>Nivel 2</option>
                <option value={"n3"}>Nivel 3</option>
            </select>
        </div>
        <div>
          <label
            htmlFor="correo"
            className="block text-xs text-white uppercase"
          >
            Correo
          </label>
          <SelectCorreos/>
          
        </div>
        {children}
      </form>
    );
}