import { dbTablas, costoflete } from 'app/schema';
import CopyButton from './copyButton';

export default async function TableFlete() {
    let fletes: any[] = [];
    try {
        fletes = await dbTablas.select().from(costoflete).orderBy(costoflete.destino);
    } catch (e: any) {
        console.error(e);
    }

    return (
        <>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-neutral-800 shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Origen</th>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Destino</th>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Tamaño de envio</th>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Costo</th>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Copiar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fletes && fletes.map((flete: any, index: number) => (
                            <tr className={index % 2 ? "bg-stone-700 text-sm hover:bg-black hover:text-white border-b border-neutral-500" : "text-sm hover:bg-black hover:text-white border-b border-neutral-500"} key={flete.id}>
                                <td className="p-4">{flete.origen}</td>
                                <td className="p-4">{flete.destino}</td>
                                <td className="p-4">{flete.tallaenvio}</td>
                                <td className="p-4">$ {flete.costo}</td>
                                <td className='mx-2 my-2'>
                                    <CopyButton costo={flete.costo} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center px-4 py-3">
                    <div className="text-sm text-slate-200">
                    Mostrando <b>1-5</b> de 45
                    </div>
                    <div className="flex space-x-1">
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Prev
                    </button>
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                        1
                    </button>                   
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Sig
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
}