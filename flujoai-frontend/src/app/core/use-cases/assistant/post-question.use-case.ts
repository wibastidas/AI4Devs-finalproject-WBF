import { QuestionResponse } from '@app/interfaces/question.response';
import { environment } from '@env/environment';

export const postQuestionUseCase = async (threadId: string, question: string) => {
  try {
    const resp = await fetch(`${environment.assistantApi}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ threadId, question })
    });

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
