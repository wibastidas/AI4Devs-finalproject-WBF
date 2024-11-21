import { environment } from '@env/environment';

type GetTokenFn = () => string | null;

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  getToken?: GetTokenFn
) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(getToken ? { 'Authorization': `Bearer ${getToken()}` } : {})
  };

  const response = await fetch(`${environment.backendApi}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });
  return response;
};