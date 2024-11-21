import { environment } from '@env/environment';
import { apiRequest } from '../../helpers/api.helper';

type GetTokenFn = () => string | null;

export const createThreadUseCase = async (getToken: GetTokenFn) => {
  try {
    const resp = await apiRequest('/openai/create-thread', {
      method: 'POST'
    }, getToken);

    if (!resp.ok) throw new Error('Error creating thread ID');

    const { id } = await resp.json() as { id: string };
    return id;

  } catch (error) {
    throw new Error('Error creating thread ID');
  }
};
