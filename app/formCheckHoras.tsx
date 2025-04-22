import { FechaEntradaSalida } from "./protected/atributos/fecha_entrada_salida";

export function FormCheckHora({
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
            htmlFor="fecha_entrada_salida"
            className="block text-xs text-white uppercase"
          >
            fecha entrada salida
          </label>
          <FechaEntradaSalida/>
        
        </div>
        <div>
          <label
            htmlFor="destino"
            className="block text-xs uppercase"
          >
            hora_entrada_salida
          </label>
          <select
            id="destino"
            name="destino"
            required
            className="mt-1 block w-full text-black rounded-full border border-gray-300 px-3 py-2 focus:outline-none placeholder-gray-700 shadow-sm focus:border-black  focus:ring-black sm:text-sm"
          >
            <option value={""}>Seleccione una opción</option>
            <option value={"México"}>México</option>
            <option value={"León"}>León</option>
            <option value={"Salamanca"}>Salamanca</option>
            <option value={"Tizayuca"}>Tizayuca</option>
            <option value={"Querétaro"}>Querétaro</option>
            <option value={"Guadalajara"}>Guadalajara</option>
            <option value={"Monterrey"}>Monterrey</option>
            <option value={"Aguascalientes"}>Aguascalientes</option>
            <option value={"Lagos de Moreno"}>Lagos de Moreno</option>
            <option value={"Ciudad de México"}>Ciudad de México</option>
            <option value={"Mazatlán"}>Mazatlán</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="tallaenvio"
            className="block text-xs uppercase"
          >
            nombre_empleado
          </label>
          <select
            id="tallaenvio"
            name="tallaenvio"
            required
            className="mt-1 block w-full text-black rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          >
            <option value={""}>Seleccione una opción</option>
            <option value={"Jumbo"}>Jumbo</option>
            <option value={"Full"}>Full</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="costo"
            className="block text-xs uppercase"
          >
            correo_empleado
          </label>
          <input
            type="numeric"
            step="any"
            id="costo"
            name="costo"
            required
            className="mt-1 block w-full text-black appearance-none rounded-full border border-gray-300 px-3 py-2 placeholder-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
           
        </div>
        

        {children}
      </form>
    );
  }
  