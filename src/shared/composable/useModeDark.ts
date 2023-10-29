import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

export function useModeDark() {
    const $q = useQuasar();

    // Funciones para interactuar con el localStorage
    const setInLocalStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const getFromLocalStorage = (key: string, defaultValue: any) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    }

    // Inicializar el modo oscuro y el color de la barra de herramientas desde el localStorage
    const defaultColors = { modoDark: false, toolbar: 'primary' };
    const storedColors = getFromLocalStorage('colors', defaultColors);

    const isDark = ref(storedColors.modoDark);
    const toolbarColor = ref(storedColors.toolbar);

    // Asegurarse de que Quasar esté sincronizado con el valor del localStorage
    $q.dark.set(isDark.value);

    const toggleDarkMode = () => {
        $q.dark.toggle();
    };

    const setToolbarColor = (color: string) => {
        toolbarColor.value = color;
        setInLocalStorage('colors', { modoDark: isDark.value, toolbar: toolbarColor.value });
        console.log('Toolbar color set to:', color);
    };
    watch(() => $q.dark.isActive, (newVal) => {
        isDark.value = newVal;
        setInLocalStorage('colors', { modoDark: isDark.value, toolbar: toolbarColor.value });
        console.log('Dark mode toggled by watcher:', isDark.value);
    });
    return {
        isDark,
        toggleDarkMode,
        toolbarColor,
        setToolbarColor
    };
}
