// useAuth.js
import { api, sanctum } from 'src/boot/axios';
import User from 'src/interfaces/User.interface';
import { useAuthStore } from 'src/stores/auth/useAuthStore';
import { ref } from 'vue';



export type AuthData = {
  token: string | null;
  user: User | null; // Asegúrate de que User esté importado correctamente
};
export default function useAuth() {
  const authUser = ref(null);
  const authToken = ref(null);

  const authStore = useAuthStore();

  const getToken = async () => {
    await sanctum.get('/sanctum/csrf-cookie');
  };

  const login = async (form: any) => {
    await getToken();

    try {
      const response = await api.post('/auth/login', form);
      const authData = {
        token: response.data.token,
        user: response.data.data,
      };
      authStore.setAuthData(authData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, errors: ['Error desconocido'] };
    }
  };

  const regenerateToken = async () => {
    const token = localStorage.getItem('token')

    await getToken();

    if (!token) {
        console.error('Token de autenticación no encontrado');
        // Puedes manejar esto de acuerdo a tus necesidades, como mostrar un mensaje de error o redirigir al inicio de sesión.
        return;
    }
    try {
        const response = await api.get('/auth/regenerate-user', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        localStorage.setItem('token', response.data.token);

        const authData = {
           token: response.data.token,
           user: response.data.data,
        };
        authStore.setAuthData(authData);
        
      } catch (error) {
        console.error('Error al regenerar el token:', error);
      }
  };

 

const logout = async () => {
    await getToken();
    const token = localStorage.getItem('token')

    try {
      await api.get('/auth/logout', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const authData: any = {
        token: null,
        user: null,
      };

      authStore.setAuthData(authData);
      localStorage.removeItem('token');
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
};
const register = async (form: any) => {
   
  await getToken();

  try {
    const response = await api.post('/auth/register', form);
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, errors: ['Error desconocido'] };
  }
};
  return {
    authUser,
    authToken,
    login,
    register,
    logout,
    regenerateToken, // Agrega la función de regeneración del token al composable
  };
}
