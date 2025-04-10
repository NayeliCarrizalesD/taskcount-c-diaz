import { dbLogin, tableLogin } from "./db";

export default async function SelectCorreos() {
    let user: any[] = [];
    try {
        user = await dbLogin.select().from(tableLogin).orderBy(tableLogin.email);      
    }
    catch (error) {
        console.error(error);
    }
    return (
        <select
            id="correo"
            name="correo"
            required
            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        >
            <option value={""}>Seleccione una opción</option>
            {user.map((user: any) => (
            <option key={user.email} value={user.email}>{user.email}</option>
        ))}
           
        </select>
    );
}