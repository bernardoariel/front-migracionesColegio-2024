import { ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from '@/boot/axios';
import Escribano from '@/interfaces/Escribano.interface';

// Esta función se encarga de hacer la llamada PUT para actualizar un escribano
const updateEscribano = async (escribano: Escribano) => {
  console.log('escribano::: ', escribano);
    try {
      const response = await api.put(`/escribanos/${escribano.id}`, escribano);
      console.log('response::: ', response);
      // O si es un PATCH: await api.patch(`/escribanos/${escribano.id}`, escribano);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar escribano:', error);
      throw error;
    }
  };
  
  const useUpdateEscribano = () => {
    
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error, isSuccess } = useMutation({
      mutationFn: updateEscribano,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['escribanos'],
        });
      },
    });
  
    const updateEscribanoData = (escribanoData: Escribano) => {
      console.log('escribanoData::: ', escribanoData);
      if (!isPending.value) {
        mutate(escribanoData);
      }
    };
  
    return {
      updateEscribano: updateEscribanoData,
      isPending,
      isError,
      error,
      isSuccess
    };
  };
  
  export default useUpdateEscribano;