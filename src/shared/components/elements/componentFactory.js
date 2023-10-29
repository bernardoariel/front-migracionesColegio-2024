import CustomInput from "./CustomInput.vue";

const components = {
    input: CustomInput,
    // select: MySelect,
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