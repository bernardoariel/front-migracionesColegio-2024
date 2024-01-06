import { api } from '@/boot/axios';
import { watch, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import { useEscribanosStore } from '../store/escribanos';
import { storeToRefs } from 'pinia';

import { EscribanosResponse } from '../../../interfaces/Escribano.interface';
import Escribano from '../../../interfaces/Escribano.interface';

const getEscribanos = async (): Promise<Escribano[]> => {
  const { data }  = await api.get<EscribanosResponse>('/escribanos');
  return data.escribanos;
};

const useEscribanos = () =>{
  
  const store = useEscribanosStore();
  const { escribanos } = storeToRefs(store)

  const { isLoading, isError, data, error } = useQuery({
      queryKey: ['escribanos'],
      queryFn: getEscribanos,
      
  });

  watch( data, escribanos =>{
    if( escribanos )
      store.setEscribanos( escribanos )
  })

  return {
    isLoading,
    isError,   
    escribanos,     
    error,

    count: computed(()=> escribanos.value?.length ?? 0)
  }
  
}

export default useEscribanos;