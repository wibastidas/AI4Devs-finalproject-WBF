const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return { id: thread.id };
};

const handleQuestion = async (threadId, question) => {
  // Crear mensaje
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: question,
  });

  // Crear run
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: ASSISTANT_ID,
  });

  // Esperar respuesta
  await waitForCompletion(threadId, run.id);

  // Obtener mensajes
  const messageList = await openai.beta.threads.messages.list(threadId);
  return messageList.data.map(message => ({
    role: message.role,
    content: message.content.map(content => content.text.value)
  })).reverse();
};

const waitForCompletion = async (threadId, runId) => {
  const run = await openai.beta.threads.runs.retrieve(threadId, runId);
  if (run.status === 'completed') return run;
  await new Promise(resolve => setTimeout(resolve, 1000));
  return waitForCompletion(threadId, runId);
};

module.exports = {
  createThread,
  handleQuestion
};