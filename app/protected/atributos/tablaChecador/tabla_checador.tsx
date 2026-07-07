import { getEntradaSalidaUnUsuario, getUsuario, getEntradasSalidasTodas } from 'app/schema';
import { auth } from '@/app/auth';
import TablaChecadorClient from './TablaChecadorClient';

export default async function TablaChecador() {
    let session = await auth();
    let correo = session?.user?.email;

    let checador: any[] = [];
    let isAdmin = false;
    
    try {
        if (correo) {
            const usuarioResponse = await getUsuario(correo);
            if (usuarioResponse && usuarioResponse.length > 0) {
                isAdmin = usuarioResponse[0].nivel === 'na1';
            }
            if (isAdmin) {
                checador = await getEntradasSalidasTodas();
            } else {
                checador = await getEntradaSalidaUnUsuario(correo);
            }
        } 
    } catch (error) {
        console.error(error);   
    }

    return (
        <TablaChecadorClient initialChecador={checador} />
    );
}