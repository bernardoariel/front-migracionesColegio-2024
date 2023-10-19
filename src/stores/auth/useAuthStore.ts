import { defineStore } from 'pinia';
import User from '../../interfaces/User.interface';
import { computed, ref } from 'vue';


interface AuthData {
  token: string;
  user: User; // Asume que tienes un tipo User definido
}

export const useAuthStore = defineStore('auth', () => {

  const authData = ref<AuthData | null>(null); 


  return {
    authData,
    getAuthData:computed(()=> authData.value),
    setAuthData(data: AuthData) {
      console.log('data::: ', data);
      authData.value = data;
    },
    clearAuthData() {
      authData.value = null;
    },
  };
});