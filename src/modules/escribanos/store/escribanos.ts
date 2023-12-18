import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useEscribanosStore = defineStore('escribanos',()=>{

   
    const escribanos = ref([])
    return{
        // state properties
        
        escribanos,

        // getters
        // squareCount: computed(()=>count.value * count.value),

        // Actions
        setEscribanos(newEscribanos:any){
            escribanos.value = newEscribanos;

        },
        
        
    }

});