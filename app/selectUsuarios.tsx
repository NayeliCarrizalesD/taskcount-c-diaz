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
            className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
        >
            <option value={""}>Seleccione una opción</option>
            {user.map((user: any) => (
            <option key={user.email} value={user.email}>{user.email}</option>
        ))}
           
        </select>
    );
}