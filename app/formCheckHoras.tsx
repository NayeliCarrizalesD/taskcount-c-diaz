import { FechaEntradaSalida } from "./protected/atributos/fecha_entrada_salida";
import { HoraEntradaSalida } from "./protected/atributos/hora_entrada_salida";
import { InputChecadorUsuario } from "./protected/atributos/inputChecador";
import { InputCorreoUsuario } from "./protected/atributos/inputCorreoUsuario";
import { InputNombreUsuario } from "./protected/atributos/inputNombreUsuario";

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
          </label>
          <FechaEntradaSalida/>
        
        </div>
        <div>
          <label
            htmlFor="hora_entrada_salida"
            className="block text-xs uppercase"
          >
          </label>
          <HoraEntradaSalida
          />
        </div>
        <div>
          <label
            htmlFor="checador"
            className="block text-xs uppercase"
          >
          </label>
          <InputChecadorUsuario
          />
        </div>
        <div>
          <label
            htmlFor="nombre_empleado"
            className="block text-xs uppercase"
          >
          </label>
          <InputNombreUsuario/>
        </div>
        <div>
          <label
            htmlFor="correo_empleado"
            className="block text-xs uppercase"
          >
          </label>
          <InputCorreoUsuario />
           
        </div>
        

        {children}
      </form>
    );
  }
  