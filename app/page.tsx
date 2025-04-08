import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl">
            Despacho Contable Carrizales Díaz
          </h1>
          <p className="text-stone-400 mt-5">
            Bienvenidos! para iniciar sesion da click en el boton de abajo 
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/protected"
            className="flex h-10 w-full items-center justify-center border transition-all focus:outline-none rounded-full border-blue-300 hover:bg-cyan-600 bg-indigo-950 text-white text-sm sm:text-base sm:h-10 px-2 sm:px-5 m-2"
          >
            Inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
