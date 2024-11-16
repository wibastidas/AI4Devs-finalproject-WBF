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

const handleAssistantFunction = async (functionName, functionArgs) => {
  console.log('\n🔄 Iniciando llamada a función:', functionName);
  console.log('📅 Fechas solicitadas por el asistente:', functionArgs);

  try {
    // Validar y establecer fechas por defecto si es necesario
    const validatedArgs = validateFunctionArgs(functionName, functionArgs);
    const result = await executeFunction(functionName, validatedArgs);

    // Agregar las fechas utilizadas a la respuesta
    if (validatedArgs.startDate && validatedArgs.endDate) {
      result.dateRange = {
        startDate: validatedArgs.startDate,
        endDate: validatedArgs.endDate
      };
    }

    console.log('✅ Función', functionName, 'completada');
    console.log('📊 Tamaño de la respuesta:', JSON.stringify(result).length, 'caracteres');
    
    return result;
  } catch (error) {
    console.error('❌ Error en función', functionName + ':', error);
    throw error;
  }
};

const handleQuestion = async (threadId, question) => {
  try {
    // Obtener fecha actual
    const today = new Date();
    const currentDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    // Agregar la fecha actual al mensaje del usuario
    const contextDate = `[Sistema: Fecha actual=${currentDate.year}-${String(currentDate.month).padStart(2, '0')}-${String(currentDate.day).padStart(2, '0')}]`;
    const enrichedQuestion = `${contextDate}\nUsuario: ${question}`;

    console.log('\n📝 Nueva pregunta recibida:', question);
    console.log('📅 Contexto temporal:', contextDate);
    console.log('📦 Tamaño de la pregunta:', JSON.stringify(enrichedQuestion).length, 'caracteres');
    console.log('🧵 Thread ID:', threadId);

    const userMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: enrichedQuestion,
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
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  
  // Calcular el mes anterior
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  
  // Fechas para el mes actual
  const firstDayOfMonth = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
  const lastDay = today.getDate();
  const currentDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  // Fechas para el mes anterior
  const firstDayPrevMonth = `${previousYear}-${String(previousMonth).padStart(2, '0')}-01`;
  const lastDayPrevMonth = new Date(previousYear, previousMonth, 0).getDate();
  const lastDatePrevMonth = `${previousYear}-${String(previousMonth).padStart(2, '0')}-${String(lastDayPrevMonth).padStart(2, '0')}`;

  const defaultDates = {
    startDate: firstDayOfMonth,
    endDate: currentDate,
    previousMonth: {
      startDate: firstDayPrevMonth,
      endDate: lastDatePrevMonth
    }
  };

  console.log('\n📅 Proceso de validación de fechas:');
  console.log('- Fechas recibidas:', args);
  console.log('- Fechas por defecto:', defaultDates);
  console.log('- Año actual:', currentYear);
  console.log('- Mes actual:', currentMonth);
  console.log('- Mes anterior:', previousMonth);

  switch (name) {
    case 'get_dashboard_summary':
      args.startDate = defaultDates.startDate;
      args.endDate = defaultDates.endDate;
      break;
    case 'get_income_expenses_by_date':
    case 'get_expenses_by_category':
    case 'get_income_by_category':
      if (!args.startDate || !args.endDate) {
        args.startDate = defaultDates.startDate;
        args.endDate = defaultDates.endDate;
      } else {
        // Verificar si la consulta es para el mes anterior
        const requestedDate = new Date(args.startDate);
        const requestedMonth = requestedDate.getMonth() + 1;
        
        if (requestedMonth === previousMonth) {
          args.startDate = defaultDates.previousMonth.startDate;
          args.endDate = defaultDates.previousMonth.endDate;
        } else if (requestedMonth === currentMonth) {
          args.startDate = defaultDates.startDate;
          args.endDate = defaultDates.endDate;
        }
      }
      break;
    case 'get_balance_distribution':
      break;
    default:
      throw new Error(`Función no implementada: ${name}`);
  }

  console.log('- Fechas finales después de validación:', args);
  return args;
};

const executeFunction = async (name, args) => {
  switch (name) {
    case 'get_dashboard_summary':
      return await dashboardService.getDashboardSummary(args);
    case 'get_income_expenses_by_date':
      return await dashboardService.getIncomeExpensesByDate(args);
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