import { boot } from 'quasar/wrappers';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60, // 1 minuto
      },
    },
  });

export default boot(({ app }) => {
  app.use(VueQueryPlugin);
});
