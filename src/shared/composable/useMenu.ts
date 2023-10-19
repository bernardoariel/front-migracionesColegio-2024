import { useMenuStore } from '../../stores/menu/menu';


export const useMenu = () => {
    
    const store = useMenuStore();

    const toggleLeftDrawer = () => {
        store.setSideMenu();
    }

    const getLeftDrawerOpen = () => store.isSideMenuOpen;

    return {
        getLeftDrawerOpen,
        toggleLeftDrawer
    }
}