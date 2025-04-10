import { CheckHora } from "@/app/check_hora";


export const PlaceholderCheckHora = () => {
    return (
        <div className="lg:col-span-8 sm:col-span-12 overflow-hidden rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                    Hora
                </h3>
            </div>

            <div className="h-64 px-4">
            <CheckHora/>        
            </div>
        </div>
    );
};