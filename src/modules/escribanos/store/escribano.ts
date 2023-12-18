import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useEscribanoStore = defineStore('escribano',()=>{

   
    const escribano = ref([])
    return{
        // state properties
        
        escribano,

        // getters
        // squareCount: computed(()=>count.value * count.value),

        // Actions
        setEscribano(newEscribano:any){
            escribano.value = newEscribano;

        },
        
        
    }

});