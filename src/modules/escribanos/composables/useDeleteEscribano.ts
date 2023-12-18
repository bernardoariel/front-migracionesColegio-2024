// useDeleteEscribano.ts
import { ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from '@/boot/axios';

// Función que realiza la llamada DELETE para eliminar un escribano
const deleteEscribanoApi = async (id: number) => {
  const response = await api.delete(`/escribanos/${id}`);
  return response.data;
};

// Composable para usar la mutación
const useDeleteEscribano = () => {
  const queryClient = useQueryClient();

  // useMutation retorna varios helpers que puedes utilizar
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    // La función que realiza la mutación
    mutationFn: deleteEscribanoApi,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['escribanos'],
          });
    },
    // Opcionalmente, podrías manejar onError aquí también
  });

  // Método para invocar la mutación
  const deleteEscribano = (id: number) => {
    mutate(id);
  };

  return {
    deleteEscribano,
    isPending, // En lugar de isLoading
    isError,
    error,
    isSuccess,
  };
};

export default useDeleteEscribano;
