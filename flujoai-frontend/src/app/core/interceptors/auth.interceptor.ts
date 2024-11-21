import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    console.log('🔒 Interceptor agregando token a:', req.url);
    return next(clonedRequest);
  }
  
  return next(req);
};