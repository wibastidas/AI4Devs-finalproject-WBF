import { QuestionResponse } from '@app/interfaces/question.response';
import { environment } from '@env/environment';

export const postQuestionUseCase = async (threadId: string, question: string) => {
  try {
    const resp = await fetch(`${environment.assistantApi}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ threadId, question })
    });

    if (!resp.ok) {
      const error = await resp.json();
      console.error('Error en la respuesta:', error);
      return []; // Retornar array vacío en caso de error
    }

    const replies = await resp.json() as QuestionResponse[];
    return replies;

  } catch (error) {
    console.error('Error:', error);
    return []; // Retornar array vacío en caso de error
  }
};
