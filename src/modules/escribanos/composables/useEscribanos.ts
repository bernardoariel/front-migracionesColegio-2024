import { useQuery } from '@tanstack/vue-query';
import { api } from '@/boot/axios';



const getEscribanos = async () => {
    const response  = await api.get('/escribanos');
    console.log("Datos recibidos:", response.data.escribanos);
    
    return response.data.escribanos;// Suponiendo que los escribanos están directamente en response.data
  };
const useEscribanos = () =>{

    const { isFetching, isError, data, error } = useQuery({
        queryKey: ['escribanos'],
        queryFn: getEscribanos,
      });

   

   
    return {
        isFetching, // true mientras la petición está en progreso
    isError,    // true si la petición falló
    data,       // los datos obtenidos o undefined si la petición no ha sido completada o falló
    error,
       
    }
}

export default useEscribanos;