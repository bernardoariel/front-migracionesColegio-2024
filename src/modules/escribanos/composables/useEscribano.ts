import { ref, watch } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { api } from '@/boot/axios';
import Escribano from '@/interfaces/Escribano.interface';

const getEscribano = async(id:number):Promise<any> =>{

    const { data } = await api.get<Escribano>(`/escribanos/${id}`);
    return data
}

const useEscribano = (id:number) =>{

    const queryClient = useQueryClient();
    const escribano = ref<Escribano | null>(null);

    const { isLoading, data } = useQuery({
        queryKey: ['escribano',id],
        queryFn: ()=> getEscribano(id),
        staleTime: 100,
        retry:3,
    });
    
    watch( data, ()=>{
        if (data.value)
            escribano.value = data.value
    })
    const refetchEscribano = async () => {
        // Se llama a invalidateQueries para marcar la consulta como obsoleta
        // y forzar su refresco si está activa.
        await queryClient.invalidateQueries({
          queryKey: ['escribano', id],
        });
      };
      return {
        isLoading,
        escribano: data,
        refetchEscribano,
      };
}

export default useEscribano;