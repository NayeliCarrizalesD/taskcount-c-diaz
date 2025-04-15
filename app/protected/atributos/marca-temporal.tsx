

export const MarcaTemporal = async () => {
  const currentDat = new Date();
//  Fecha completa separada por / slash
const currentDate = currentDat.toLocaleDateString("en-US");


    


  return ( 
    
      <div>
       
       <input
       value={currentDate}
       />
   
     
      </div>     
        
 
     

);

};


