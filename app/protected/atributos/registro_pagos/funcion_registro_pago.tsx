export async function createRegistroPagoHonorarios(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("/api/registroPago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
}


