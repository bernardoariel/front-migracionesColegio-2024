import { useQuery } from '@tanstack/vue-query';
import { api } from '@/boot/axios';
import { useEscribanosStore } from '../store/escribanos';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';



const getEscribanos = async () => {
  const response  = await api.get('/escribanos');
  console.log("Datos recibidos:", response.data.escribanos);
  
  return response.data.escribanos;// Suponiendo que los escribanos están directamente en response.data
};
const useEscribanos = () =>{
  
  const store = useEscribanosStore();
  const { escribanos } = storeToRefs(store)

  const { isLoading, isError, data, error } = useQuery({
      queryKey: ['escribanos'],
      queryFn: getEscribanos,
      staleTime: 100,
      
  });

  watch( data, escribanos =>{
    if( escribanos )
      store.setEscribanos( escribanos )
  })

  return {
    isLoading, // true mientras la petición está en progreso
    isError,    // true si la petición falló
    escribanos,       // los datos obtenidos o undefined si la petición no ha sido completada o falló
    error,
  }
  
}

export default useEscribanos;