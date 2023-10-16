import { ref } from "vue"


export const useUI = () =>{
    const leftDrawerOpen = ref(false)


    return {
        
        leftDrawerOpen,
        toggleLeftDrawer: leftDrawerOpen.value = !leftDrawerOpen.value
        
    }
}

export default useUI