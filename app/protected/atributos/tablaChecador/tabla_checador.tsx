import { getEntradaSalidaUnUsuario } from 'app/schema';
import { auth } from '@/app/auth';
import TablaChecadorClient from './TablaChecadorClient';

export default async function TablaChecador() {
    let session = await auth();
    let correo = session?.user?.email;

    let checador: any[] = [];
    
    try {
        if (correo) {
            checador = await getEntradaSalidaUnUsuario(correo);
        } 
    } catch (error) {
        console.error(error);   
    }

    return (
        <TablaChecadorClient initialChecador={checador} />
    );
}