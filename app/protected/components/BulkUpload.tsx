
"use client";

import React, { useState } from 'react';

export function BulkUpload() {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleDownloadTemplate = () => {
        const headers = ["nombre_cliente", "rfc", "telefono_cliente", "correo_cliente", "fecha_alta", "concepto", "pago", "mes_pago", "year_pago"];
        const csvContent = "data:text/csv;charset=utf-8," + headers.join(",");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "plantilla_carga_pagos.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage(null);

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const text = event.target?.result as string;
                // Basic parser handling \r\n and \n
                const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');
                const headerLine = lines[0];

                if (!headerLine) throw new Error("Archivo vacío");

                const headers = headerLine.split(',').map(h => h.trim());
                const data = lines.slice(1).map(line => {
                    // Simple split by comma. 
                    // Note: Does not handle commas within quoted strings. 
                    // Sufficient for simple template use case.
                    const values = line.split(',');
                    const entry: any = {};

                    headers.forEach((header, index) => {
                        let val = values[index]?.trim();
                        if (val === undefined) val = "";
                        entry[header] = val;
                    });

                    return entry;
                });

                const response = await fetch('/api/upload-csv', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    setMessage(`Carga completa: ${result.results.success} exitosos, ${result.results.failed} fallidos.`);
                } else {
                    setMessage(`Error al cargar: ${result.error || result.message}`);
                }

            } catch (error: any) {
                setMessage(`Error procesando archivo: ${error.message}`);
            } finally {
                setUploading(false);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="bg-slate-700 p-4 rounded-lg my-4 text-white">
            <h3 className="text-lg font-bold mb-2">Carga Masiva de Pagos</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button
                    onClick={handleDownloadTemplate}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                >
                    Descargar Plantilla CSV
                </button>

                <div className="flex flex-col">
                    <label className="text-sm mb-1">Subir CSV</label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-slate-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                "
                        disabled={uploading}
                    />
                </div>
            </div>
            {uploading && <p className="mt-2 text-yellow-400">Procesando...</p>}
            {message && <p className="mt-2 font-semibold text-green-400">{message}</p>}
        </div>
    );
}
