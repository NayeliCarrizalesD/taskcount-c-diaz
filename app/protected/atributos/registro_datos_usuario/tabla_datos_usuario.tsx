import { dbTablas, datosUsuario } from "@/app/schema";

export default async function TablaDatosUsuarios() {
    let usuarios: any[] = [];
    try {
        usuarios = await dbTablas.select().from(datosUsuario).orderBy(datosUsuario.id_usuario).limit(5);
    }
    catch (e: any) {
        console.error(e);
    }

    return (
        <>
        <div className="custom-table-container">
            <table className="custom-table">   
                <thead className="custom-table-thead">
                    <tr>
                        <th className="custom-table-th">Alta</th>
                        <th className="custom-table-th">Telefono</th> 
                        <th className="custom-table-th">Correo</th>
                        <th className="custom-table-th">Nivel</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios && usuarios.map((usuario: any) => (
                        <tr className="custom-table-tr" key={usuario.id_usuario}>
                            <td>{usuario.fecha_alta}</td>
                            <td>{usuario.telefono_usuario}</td>
                            <td>{usuario.correo}</td>
                            <td>
                                {usuario.nivel === "na1"?"Administrador":""}
                                {usuario.nivel === "n1"?"Nivel 1":""}
                                {usuario.nivel === "n2"?"Nivel 2":""}
                                {usuario.nivel === "n3"?"Nivel 3":""}           
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex items-center my-3 mx-2 flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    
                    <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>    

        </>
    )
}
