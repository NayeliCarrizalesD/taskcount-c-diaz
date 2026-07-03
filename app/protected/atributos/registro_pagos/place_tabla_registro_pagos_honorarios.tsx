"use client";
import TablaPagosHonorarios from "./tabla_registro_pago";
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";

export default function PlaceholderTablaPagosHonorarios({ datosTabla, loading, onRefresh }: { datosTabla: any[], loading: boolean, onRefresh?: () => void }) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <div className="lg:col-span-8 sm:col-span-12 overflow-hidden rounded-3xl bg-zinc-800 shadow-xl h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    Pagos Honorarios
                </h3>
                <h3 className="font-normal">
                    Ver los pagos que se han realizado de los clientes por honorarios
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center pb-4">
                <div className="mb-4">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
                            <FaSearch className="h-4 w-4" />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar pago por cliente, concepto, año, mes o empleado..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/60 border border-zinc-700/60 hover:border-zinc-500/60 focus:border-sky-500 rounded-2xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all duration-200"
                        />
                    </div>
                </div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500"></div>
                        <p className="mt-3 text-sm text-gray-400">Cargando pagos...</p>
                    </div>
                ) : (
                    <TablaPagosHonorarios
                      searchQuery={searchQuery}
                      datosTabla={datosTabla} 
                      onRefresh={onRefresh}
                    />
                )}
            </div>
        </div>
    );
}