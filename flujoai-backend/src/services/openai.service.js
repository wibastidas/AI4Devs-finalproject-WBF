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
    console.log(`⏳ Intento ${attempts + 1}/${maxAttempts} para run ${runId}`);
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    console.log(`📊 Estado actual del run: ${run.status}`);
    
    switch (run.status) {
      case 'completed':
        console.log('✅ Run completado exitosamente');
        return run;
      case 'requires_action':
        console.log('🔄 Run requiere acción');
        return run;
      case 'failed':
        console.error('❌ Run falló:', run.last_error);
        throw new Error('Run failed: ' + run.last_error);
      case 'cancelled':
        console.error('🚫 Run cancelado');
        throw new Error('Run was cancelled');
      case 'expired':
        console.error('⌛ Run expirado');
        throw new Error('Run expired');
      default:
        console.log(`⏳ Esperando... Estado actual: ${run.status}`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        attempts++;
    }
  }
  
  throw new Error('Timeout waiting for run completion');
};

const handleAssistantFunction = async (name, args) => {
  console.log(`🔧 Ejecutando función ${name} con argumentos:`, args);
  let result;
  
  try {
    switch (name) {
      case 'get_dashboard_summary':
        result = await dashboardService.getDashboardSummary(args);
        break;
      case 'get_balance_distribution':
        result = await dashboardService.getBalanceDistribution();
        break;
      case 'get_expenses_by_category':
        result = await dashboardService.getExpensesByCategory(args);
        break;
      case 'get_income_by_category':
        result = await dashboardService.getIncomeByCategory(args);
        break;
      default:
        throw new Error(`Función no implementada: ${name}`);
    }
    
    console.log(`✅ Función ${name} ejecutada exitosamente:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Error ejecutando función ${name}:`, error);
    throw error;
  }
};

const handleQuestion = async (threadId, question) => {
  try {
    console.log('🚀 Iniciando handleQuestion:', { threadId, question });
    
    // Verificar runs activos
    console.log('🔍 Buscando runs activos...');
    const runs = await openai.beta.threads.runs.list(threadId);
    const activeRun = runs.data.find(run => 
      ['in_progress', 'queued', 'requires_action'].includes(run.status)
    );
    
    if (activeRun) {
      console.log('⚠️ Run activo encontrado:', activeRun.id);
      try {
        console.log('🔄 Intentando cancelar run activo...');
        await openai.beta.threads.runs.cancel(threadId, activeRun.id);
        console.log('✅ Run cancelado exitosamente');
      } catch (error) {
        console.error('❌ Error cancelando run:', error);
      }
    }

    console.log('📝 Creando mensaje del usuario...');
    const userMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: question,
    });

    console.log('🔄 Creando nuevo run...');
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    console.log('⏳ Esperando completación inicial...');
    let runStatus = await waitForCompletion(threadId, run.id);
    
    while (runStatus.status === 'requires_action') {
      console.log('🛠️ Procesando acciones requeridas...');
      const toolCalls = runStatus.required_action.submit_tool_outputs.tool_calls;
      const toolOutputs = [];

      for (const toolCall of toolCalls) {
        console.log(`🔧 Ejecutando función: ${toolCall.function.name}`);
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        
        console.log('📊 Argumentos:', functionArgs);
        const result = await handleAssistantFunction(functionName, functionArgs);
        console.log('✅ Resultado obtenido:', result);
        
        toolOutputs.push({
          tool_call_id: toolCall.id,
          output: JSON.stringify(result)
        });
      }

      console.log('📤 Enviando resultados al asistente...');
      runStatus = await openai.beta.threads.runs.submitToolOutputs(
        threadId,
        run.id,
        { tool_outputs: toolOutputs }
      );

      console.log('⏳ Esperando respuesta final...');
      runStatus = await waitForCompletion(threadId, run.id);
    }

    console.log('📥 Obteniendo mensajes del thread...');
    const messageList = await openai.beta.threads.messages.list(threadId);
    const assistantResponse = messageList.data.find(msg => 
      msg.role === 'assistant' && 
      msg.created_at > userMessage.created_at
    );

    console.log('✅ Proceso completado');
    return [{
      role: 'assistant',
      content: assistantResponse ? assistantResponse.content.map(c => c.text.value) : []
    }];

  } catch (error) {
    console.error('❌ Error en handleQuestion:', error);
    throw error;
  }
};

module.exports = {
  createThread,
  handleQuestion
};