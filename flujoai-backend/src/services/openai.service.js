const OpenAI = require('openai');
const dashboardService = require('./dashboard.service');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return { id: thread.id };
};

const waitForCompletion = async (threadId, runId) => {
  let maxAttempts = 30;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    
    if (run.status === 'completed' || run.status === 'requires_action') {
      return run;
    }
    
    if (run.status === 'failed') {
      throw new Error(run.last_error?.message || 'Run failed');
    }
    
    if (run.status === 'cancelled' || run.status === 'expired') {
      throw new Error(`Run ${run.status}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
  }
  
  throw new Error('Máximo número de intentos alcanzado');
};

const handleAssistantFunction = async (name, args) => {
  try {
    console.log('\n🔄 Iniciando llamada a función:', name);
    console.log('📅 Rango de fechas:', args.startDate, 'a', args.endDate);
    
    validateFunctionArgs(name, args);
    const result = await executeFunction(name, args);
    
    console.log(`✅ Función ${name} completada`);
    console.log('📊 Tamaño de la respuesta:', JSON.stringify(result).length, 'caracteres\n');
    
    return {
      status: 'success',
      data: result
    };
  } catch (error) {
    console.error(`❌ Error en función ${name}:`, error);
    return {
      status: 'error',
      error: {
        code: error.code || 'FUNCTION_ERROR',
        message: error.message
      }
    };
  }
};

const handleQuestion = async (threadId, question) => {
  try {
    console.log('\n📝 Nueva pregunta recibida:', question);
    console.log('📦 Tamaño de la pregunta:', JSON.stringify(question).length, 'caracteres');
    console.log('🧵 Thread ID:', threadId);
    
    // Obtener el estado actual del hilo antes de crear el mensaje
    const currentThread = await openai.beta.threads.retrieve(threadId);
    console.log('📊 Estado actual del hilo:', {
      id: currentThread.id,
      created_at: currentThread.created_at,
      metadata: currentThread.metadata
    });
    
    let toolCalls = [];
    const userMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: question,
    });
    
    // Log del mensaje creado
    console.log('✉️ Mensaje creado:', {
      id: userMessage.id,
      role: userMessage.role,
      content_length: userMessage.content.length,
      created_at: userMessage.created_at
    });
    
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    let runStatus = await waitForCompletion(threadId, run.id);
    
    while (runStatus.status === 'requires_action') {
      toolCalls = runStatus.required_action.submit_tool_outputs.tool_calls;
      console.log(`\n🛠️ El asistente requiere ${toolCalls.length} funciones:`);
      
      const toolOutputs = [];

      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        console.log(`\n📌 Ejecutando función #${toolOutputs.length + 1}:`, functionName);
        
        const result = await handleAssistantFunction(functionName, functionArgs);
        toolOutputs.push({
          tool_call_id: toolCall.id,
          output: JSON.stringify(result)
        });
      }

      runStatus = await openai.beta.threads.runs.submitToolOutputs(
        threadId,
        run.id,
        { tool_outputs: toolOutputs }
      );

      runStatus = await waitForCompletion(threadId, run.id);
    }

    console.log('Obteniendo mensajes del hilo:', threadId);
    const messages = await openai.beta.threads.messages.list(threadId, {
      limit: 10,
      order: 'desc'
    });
    console.log('Número de mensajes encontrados:', messages.data.length);
    const assistantResponse = messages.data.find(msg => 
      msg.role === 'assistant' && 
      msg.created_at > userMessage.created_at
    );

    return {
      role: 'assistant',
      content: assistantResponse ? assistantResponse.content.map(c => ({
        type: c.type,
        text: c.text.value,
        context: {
          functionCalls: toolCalls.length || 0,
          timestamp: new Date().toISOString()
        }
      })) : []
    };

  } catch (error) {
    throw error;
  }
};

const validateFunctionArgs = (name, args) => {
  switch (name) {
    case 'get_dashboard_summary':
    case 'get_expenses_by_category':
    case 'get_income_by_category':
      if (!args.startDate || !args.endDate) {
        throw new Error('startDate y endDate son requeridos');
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(args.startDate) || 
          !/^\d{4}-\d{2}-\d{2}$/.test(args.endDate)) {
        throw new Error('Formato de fecha inválido. Use YYYY-MM-DD');
      }
      break;
  }
};

const getDashboardSummary = async ({ startDate, endDate }) => {
  // ... código existente ...
  return {
    status: 'success',
    data: {
      totalBalance: Number(totalBalance).toFixed(2),
      monthlyIncome: Number(transactions[0].monthlyIncome || 0).toFixed(2),
      monthlyExpenses: Number(transactions[0].monthlyExpenses || 0).toFixed(2)
    }
  };
};

const executeFunction = async (name, args) => {
  switch (name) {
    case 'get_dashboard_summary':
      return await dashboardService.getDashboardSummary(args);
    case 'get_balance_distribution':
      return await dashboardService.getBalanceDistribution();
    case 'get_expenses_by_category':
      return await dashboardService.getExpensesByCategory(args);
    case 'get_income_by_category':
      return await dashboardService.getIncomeByCategory(args);
    default:
      throw new Error(`Función no implementada: ${name}`);
  }
};

module.exports = {
  createThread,
  handleQuestion
};