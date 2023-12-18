import { ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from '@/boot/axios';
import Escribano from '@/interfaces/Escribano.interface';

// Esta función se encarga de hacer la llamada POST para crear un nuevo escribano
const postEscribano = async (newEscribano: Escribano) => {
  
  try {

    const dataSave = {
      ...newEscribano,
      dni: newEscribano.cuil,
      condicion_id: 2,
      user_id: 1
    };

    const response = await api.post('/escribanos', dataSave);

    return response.data;

  } catch (error) {
    // Aquí puedes manejar el error, por ejemplo, registrarlo o incluso devolver un objeto de error personalizado
    console.error('Error al crear escribano:', error);
    throw error;
  }
};

// Composable para usar la mutación
const useCreateEscribano = () => {
  const queryClient = useQueryClient();
  // useMutation retorna varios helpers que puedes utilizar
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    // La función que realiza la mutación
    mutationFn: postEscribano,
    onSuccess: () => {
      // Invalida y refetch la query de los escribanos para obtener la lista actualizada
      queryClient.invalidateQueries({
        queryKey: ['escribanos'],
      });
    },
  });

  // Método para invocar la mutación
  const addEscribano = (newEscribanoData: Escribano) => {
    if (!isPending.value) {
      mutate(newEscribanoData);
    }
  };

  return {
    addEscribano,
    isPending,
    isError,
    error,
    isSuccess
  };
};

export default useCreateEscribano;