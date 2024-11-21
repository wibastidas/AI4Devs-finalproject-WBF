import { QuestionResponse } from '@app/interfaces/question.response';
import { apiRequest } from '../../helpers/api.helper';

type GetTokenFn = () => string | null;

export const postQuestionUseCase = async (
  threadId: string, 
  question: string,
  getToken: GetTokenFn
) => {
  try {
    const resp = await apiRequest('/openai/user-question', {
      method: 'POST',
      body: JSON.stringify({ threadId, question })
    }, getToken);

    if (!resp.ok) {
      const error = await resp.json();
      console.error('Error en la respuesta:', error);
      throw error;
    }

    const data = await resp.json() as QuestionResponse;
    return data;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
