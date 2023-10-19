import { api,sanctum } from 'src/boot/axios';
import { ref } from 'vue';


export default function useAuth() {
    const authUser = ref(null);
    const authToken = ref<string | null>(null); // Especifica el tipo aquí

    const getToken = async () => {
        await sanctum.get('/sanctum/csrf-cookie');
    };

    const login = async (form: any) => {
        await getToken();
        try {
            const response = await api.post('/auth/login', form);
            authToken.value = response.data.token;
            authUser.value = response.data.data;
            return { success: true, data: response.data };
        } catch (error) {
           
            return { success: false, errors: ['Error desconocido'] };
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

    const logout = async () => {
        try {
            await api.get('/auth/logout', {
                headers: {
                    'Authorization': `Bearer ${authToken.value}`
                }
            });
            authToken.value = null;
            authUser.value = null;
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return {
        authUser,
        authToken,
        login,
        register,
        logout
    };
}