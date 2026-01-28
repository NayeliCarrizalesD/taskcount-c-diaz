
import { RegistroPagoHOnorarios } from "../atributos/registro_pagos/registro_pago_honorarios";
import { BulkUpload } from "../components/BulkUpload";

export default function ProtectedRegistroPagoHonorarios() {
  return (
    <main >
      <div className="container mx-auto px-4">
        <BulkUpload />
      </div>
      <RegistroPagoHOnorarios />
    </main>
  );
}