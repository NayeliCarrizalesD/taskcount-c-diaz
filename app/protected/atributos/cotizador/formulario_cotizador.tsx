"use client"
import { useRef, useState } from "react";
import { AiFillCalculator } from "react-icons/ai";
import Swal from 'sweetalert2'

export const FormularioCotizador = () => {

    const  [ values, setValues ] = useState({
        tipoDeCambio: "",
        costoBasico: "",
        gastosAduanales: "", 
        dta: "",
        utilidad: "",
        flete: "",
        tam:""
        });

    const handleInputChange = (event: { target: { name: string; value: string;  }; })=> {
            const { name, value }= event.target;
            setValues({
                ...values,
                [name]:value,
            });
        };

    const handleForm = (event: { preventDefault: () => void; }) => {
            event.preventDefault();
//convertir un string a numero entero
            const tipoDeCambio1 = new Number(values.tipoDeCambio)
            const costoBasico1 = new Number(values.costoBasico)
            const gastosAduanales1 = new Number(values.gastosAduanales)
            const dta1 = new Number(values.dta)
            const utilidad1 = new Number(values.utilidad)
            const flete1 = new Number(values.flete)
            const tamanio = new String(values.tam)
//suma de todos los inputs
            function sumArray(arr:number[]): number{
                if (arr.length == 0 ){
                    return 0;
                } else {
                    return arr[0] + sumArray(arr.slice(1));
                }
            };
            
//dividir flete entre el tipo de cambio
            function dividir(arr:number[]): number{
                if(arr.length == 0){
                    return 0;
                } else {              
                  return arr[0]/arr[1]  
                }
            };
            const div= dividir([ Number(flete1),Number( tipoDeCambio1)]);

            function dividirJumbo({ num }: { num: number; }): number{
                const divJumbo2 =10000
                //const divJumbo: number[] =[10000]
                //const divJumbo2 = Number(divJumbo)
                if(num == 0){
                    return 0;
                } else {
                return num / divJumbo2                  
                }
            };

            function dividirFull({ num }: { num: number; }):number{
                const divFull2 =15500
                if(num == 0){
                    return 0;
                } else {
                return num / divFull2                  
                }
            };
            
            
// if de que no este ningun input vacio   
            if(values.tipoDeCambio !=='' && values.costoBasico !== '' && values.gastosAduanales !== '' && values.utilidad !== '' && values.flete !==''){
                if(tamanio == "Jumbo"){
                    //dividir el resultado de flete entre costo, entre galones de unidad
                    
                    
                    const resultadoJumbo1 = dividirJumbo({ num: div })
                    const resultadoJumbo = resultadoJumbo1.toFixed(2)
                    const total= sumArray([ Number(costoBasico1), Number(gastosAduanales1), Number(dta1), Number(utilidad1), Number(resultadoJumbo)])
                    const tot1 = new Number(total);
                    const tot2 = tot1.toFixed(2)
                    Swal.fire({ 
                        title: "El Precio para el cliente de acuerdo a su seleccion (Jumbo) es: $"+`${tot2}`+" USD. El flete que usted ingreso fue de $"+`${flete1}`+".00 "+" MX",
                        icon: "success",
                        width: 600,
                        padding: "3em",
                        color: "white",
                        background: "black",
                        customClass: {
                            popup: 'border-radius-0'
                          }
                      });
                      

                } else {
                    //dividir el resultado de flete entre costo, entre galones de unidad
                    
                   
                    const resultadoFull1 = dividirFull({ num: div })
                    const resultadoFull = resultadoFull1.toFixed(2)
                    const total= sumArray([ Number(costoBasico1), Number(gastosAduanales1), Number(dta1), Number(utilidad1), Number(resultadoFull)])
                    const tot1 = new Number(total);
                    const tot2 = tot1.toFixed(2)
                    Swal.fire({
                        title: "El Precio para el cliente de acuerdo a su seleccion (Full) es: $"+`${tot2}`+" USD. El flete que usted ingreso fue de $"+`${flete1}`+".00 MX",
                        icon: "success",
                        width: 600,
                        padding: "3em",
                        color: "white",
                        background: "black",
                        customClass: {
                            popup: 'border-radius-0'
                          }
                      });
                }
                
                 
            } else {
                Swal.fire({
                    title: "Favor de llenar todos los campos",
                    width: 600,
                    icon: "error",
                    padding: "3em",
                    color: "white",
                    background: "black",
                    customClass: {
                        popup: 'border-radius-0'
                    }
                });
            }            
        };
       
          const formRef = useRef();
          form: useRef<HTMLFormElement>()
          
        const borrarForm = (event: { preventDefault: () => void; }) => {
            event.preventDefault();
            if (formRef.current !=""){
                //const formReset = formRef.current
                //formReset.reset()
                //formReset
                document.getElementById("formCotizador")?.onreset 
                
            } else {
                Swal.fire({
                    title: "El formulario esta vacio",
                    width: 600,
                    icon: "error",
                    padding: "3em",
                    color: "white",
                    background: "black",
                    customClass: {
                        popup: 'border-radius-0'
                    }
                });
            }
        }; 

    return (
        <div className="lg:col-span-4 sm:col-span-12 relative rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <AiFillCalculator /> Cotizador
                </h3>
            </div>

            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
                <p>Ultimo Inventario:  
                    <span className="font-semibold p-1">  
                        00/00/0000
                    </span>
                </p>
                     
                <form  name="formCotizador" id="formCotizador" onSubmit={handleForm} className="flex flex-col space-y-4 bg-zinc-800 px-2 py-5 sm:px-4">
                
                    <div>
                        <label 
                        htmlFor="tipoDeCambio"
                        className="block text-xs text-white uppercase">
                        Tipo de Cambio: $
                        </label>
                        <input 
                            name="tipoDeCambio" 
                            placeholder="Tipo de Cambio" 
                            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm appearance-none" 
                            type="number"
                            step="any"
                            
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="costoBasico"
                        className="block text-xs text-white uppercase">
                            Costo Basico: $
                        </label>
                        <input 
                            name="costoBasico" 
                            placeholder="Costo Basico"
                            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm appearance-none" 
                            type="number"
                            step="any"
                          
                            onChange={handleInputChange} 

                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="gastosAduanales"
                        className="block text-xs text-white uppercase">
                            Gastos Aduanales: $
                        </label>
                        <input 
                            name="gastosAduanales" 
                            placeholder="Gastos Aduanales"
                            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm appearance-none" 
                            type="number"  
                            step="any"
                        
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="dta"
                        className="block text-xs text-white uppercase">
                            DTA: $
                        </label>
                        <input 
                            name="dta" 
                            placeholder="DTA"
                            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm appearance-none" 
                            type="number"
                            step="any"
                          
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="utilidad"
                        className="block text-xs text-white uppercase">
                            Utilidad: $
                        </label>
                        <input 
                            name="utilidad" 
                            placeholder="Utilidad"
                            className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm appearance-none" 
                            type="number"
                            step="any"
                     
                            onChange={handleInputChange} 
                        />
                    </div> 
                    <div>
                        <label htmlFor="flete"
                        className="block text-xs text-white uppercase">
                             Flete: $
                        </label>
                        <input className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm appearance-none" 
                            name="flete" 
                            type="number"
                            step="any"
                          
                            placeholder="Costo del Flete"
                            onChange={handleInputChange} 
                            />
                       
                    </div>
                    
                    <ul className="items-center w-full text-sm font-medium text-neutral-900 bg-white border border-neutral-200 rounded-3xl sm:flex dark:bg-neutral-700 dark:border-neutral-600 dark:text-white">
                        <li className="w-full border-b border-neutral-200 sm:border-b-0 sm:border-r dark:border-neutral-600">
                            <div className="flex items-center ps-3">
                                <input className="w-4 h-4 text-neutral-600 bg-neutral-100 border-neutral-300 focus:ring-neutral-500 dark:focus:ring-neutral-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600" 
                                name="tam" 
                                radioGroup="tamano"
                                type="radio"
                                step="any"
                                value={"Full"}
                                placeholder="Costo del Flete"
                                onChange={handleInputChange} 
                                /> 
                                <label className="w-10 py-2 ms-2 text-sm font-medium text-neutral-900 dark:text-neutral-300"> Full </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-neutral-200 sm:border-b-0 sm:border-r dark:border-neutral-600">  
                            <div className="flex items-center ps-3">
                                <input className="w-4 h-4 text-neutral-600 bg-neutral-100 border-neutral-300 focus:ring-neutral-500 dark:focus:ring-neutral-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600" 
                                name="tam" 
                                type="radio"
                                radioGroup="tamano"
                                step="any"
                                value={"Jumbo"}
                                placeholder="Costo del Flete"
                                onChange={handleInputChange} 
                                />
                                <label className="w-10 py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Jumbo</label>
                            </div>
                        </li>
                    </ul>

                    <button className="rounded-full border-green-300 border  transition-colors hover:bg-green-500 dark:bg-green-700 text-sm sm:text-base h-8 w-full sm:h-10 px-2 sm:px-5 m-2" 
                        type="submit">Calcular</button>

 
                           
                </form> 

                      
            </div>
       
            
            

        </div>
    );
};

//<button type="reset" className="rounded-full border-red-300 border  transition-colors hover:bg-red-500 dark:bg-red-900 text-sm sm:text-base h-8 w-full sm:h-10 px-2 sm:px-5 m-2" onClick={borrarForm} >Borrar</button>  

