import { Dashboard } from './atributos/dashboard/dashboard';

export default function ProtectedPage() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}

/*

    <main className="grid bg-black text-white gap-4 p-4 grid-cols-[220px,_1fr]">


{usuarios.map((usuario) => (
          <p key={usuario.id}>Nivel: {usuario.nivel}</p>
        ))}

//mapeo de la informacion de usuarios
        {usuarios.map((usuario) => (
          <div key={usuario.id}>
            <p>ID: {usuario.id}</p>
            <p>Nombre: {usuario.nombre}</p>
            <p>Apellido: {usuario.apellido}</p>
            <p>Nivel: {usuario.nivel}</p>
            <p>Correo: {usuario.correo}</p>
          </div>
        ))}


    <SignOut />
function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}*/
