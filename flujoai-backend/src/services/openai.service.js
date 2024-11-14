const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return { id: thread.id };
};

const waitForCompletion = async (threadId, runId) => {
  const maxAttempts = 10;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    
    switch (run.status) {
      case 'completed':
        return run;
      case 'failed':
        throw new Error('Run failed: ' + run.last_error);
      case 'cancelled':
        throw new Error('Run was cancelled');
      case 'expired':
        throw new Error('Run expired');
      default:
        // Si está en progreso o en cola, esperamos
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
    }
  }
  
  // Si llegamos aquí, significa que excedimos los intentos
  throw new Error('Timeout waiting for run completion');
};

const handleQuestion = async (threadId, question) => {
  try {
    // Verificar runs activos y esperar a que se cancelen
    const runs = await openai.beta.threads.runs.list(threadId);
    const activeRun = runs.data.find(run => 
      ['in_progress', 'queued', 'requires_action'].includes(run.status)
    );

    if (activeRun) {
      try {
        // Intentar cancelar el run activo
        await openai.beta.threads.runs.cancel(threadId, activeRun.id);
        
        // Esperar hasta que el run se cancele o complete
        let maxAttempts = 10;
        let attempts = 0;
        
        while (attempts < maxAttempts) {
          const runStatus = await openai.beta.threads.runs.retrieve(threadId, activeRun.id);
          if (['cancelled', 'completed', 'failed', 'expired'].includes(runStatus.status)) {
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
          attempts++;
        }
      } catch (cancelError) {
        // Si falla la cancelación, esperamos un poco más
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Crear mensaje y continuar con el proceso normal
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: question,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    await waitForCompletion(threadId, run.id);

    const messageList = await openai.beta.threads.messages.list(threadId);
    return messageList.data.map(message => ({
      role: message.role,
      content: message.content.map(content => content.text.value)
    })).reverse();

  } catch (error) {
    console.error('Error in handleQuestion:', error);
    throw error;
  }
};

module.exports = {
  createThread,
  handleQuestion
};