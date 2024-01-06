import { boot } from 'quasar/wrappers';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60, // Todos mis queries seran mantenidos por 1 minuto
        refetchOnReconnect: 'always'
      },
    },
  });

export default boot(({ app }) => {
  app.use(VueQueryPlugin);
});
