const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_TOKENS = 500;

exports.generateText = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Prompt recibido:', prompt);

    if (!prompt) {
      console.log('Error: Prompt no proporcionado');
      return res.status(400).json({
        ok: false,
        error: 'El prompt es requerido'
      });
    }

    console.log('Iniciando llamada a OpenAI...');
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      max_tokens: MAX_TOKENS,
      temperature: 0.7
    });

    console.log('Respuesta de OpenAI recibida:', completion.choices[0].message);
    console.log('Uso de tokens:', completion.usage);

    res.status(200).json({
      ok: true,
      data: completion.choices[0].message.content,
      usage: completion.usage
    });
  } catch (error) {
    console.error('Error detallado en OpenAI:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    res.status(500).json({
      ok: false,
      error: 'Error al generar texto',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
