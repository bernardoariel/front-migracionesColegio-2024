import CustomInput from "./CustomInput.vue";
import CustomSelect from "./CustomSelect.vue";

const components = {
    input: CustomInput,
    select: CustomSelect,
    // toggle: MyToggle,
    // ... puedes agregar más componentes aquí
};
  
export const getComponent = (type) => {
    const component = components[type];
    if (!component) {
        throw new Error(`Component type ${type} is not supported.`);
    }
    return component;
};