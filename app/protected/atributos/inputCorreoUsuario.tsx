import { auth } from 'app/auth';

export const InputCorreoUsuario = async () => {
  let session = await auth();

  return ( 

    <input
    id="correo_empleado"
    name="correo_empleado"
    value={session?.user?.email ?? ''}
    required
    readOnly
    type="email"
    className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
/>
   
);

};


