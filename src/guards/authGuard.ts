
export const authGuard = async (to: any, from: any, next: any) => {

  const token = localStorage.getItem('token')
  
  if (to.path === '/login') return next()
  if (!token) return next('/login')

  return next();

}; 