"use client";

import { useEffect, useState } from "react";
import FormularioAsignarTarea from "./FormularioAsignarTarea";
import TablaTareasAsignadas from "./TablaTareasAsignadas";
import Footer from "../footer";

interface GridTareasProps {
  showAsignarLayout?: boolean;
}

export default function GridTareas({ showAsignarLayout = false }: GridTareasProps) {
  const [tareas, setTareas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTareas = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tareas");
      if (res.ok) {
        const data = await res.json();
        setTareas(data);
      }
    } catch (err) {
      console.error("Error al cargar tareas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <>
      <div className="px-4 grid gap-3 grid-cols-12">
        {loading ? (
          <div className="col-span-12 flex flex-col justify-center items-center p-12 space-y-3">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-400"></div>
            <div className="text-gray-400 text-sm">Cargando tareas...</div>
          </div>
        ) : (
          <>
            {showAsignarLayout && (
              <FormularioAsignarTarea onTareaCreada={fetchTareas} />
            )}
            <TablaTareasAsignadas
              tareas={tareas}
              onTareaModificada={fetchTareas}
              showFullWidth={!showAsignarLayout}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
