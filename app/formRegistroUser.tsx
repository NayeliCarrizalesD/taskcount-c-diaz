export function FormRegister({
    action,
    children,
  }: {
    action: any;
    children: React.ReactNode;
  }) {
    return (
      <form
        action={action}
        className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-xs text-gray-600 uppercase"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nombre"
         
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block text-xs text-gray-600 uppercase"
          >
            Apellido
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Apellido"
          
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs text-gray-600 uppercase"
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="user@acme.com"
            autoComplete="email"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-xs text-gray-600 uppercase"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        {children}
      </form>
    );
  }
  