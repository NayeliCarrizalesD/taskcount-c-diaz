import { ActividadPagos } from "./actividad_pagos";


export const PlaceholderActividadPagos = () => {
    return (
        <div className="lg:col-span-4 sm:col-span-12 overflow-hidden rounded-3xl bg-zinc-800  shadow-xl h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                    Ganancias hasta el momento
                </h3>
            </div>

            <div className="h-64 px-4">
            <ActividadPagos/>      
            
            </div>
        </div>
    );
};