const openaiService = require('../services/openai.service');

exports.createThread = async (req, res) => {
  try {
    const thread = await openaiService.createThread();
    res.json(thread);
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.handleQuestion = async (req, res) => {
  try {
    const { threadId, question } = req.body;
    
    if (!threadId || !question) {
      return res.status(400).json({
        error: 'ThreadId y question son requeridos'
      });
    }

    const messages = await openaiService.handleQuestion(threadId, question);
    res.json(messages);
  } catch (error) {
    console.error('Error handling question:', error);
    
    if (error.status === 400) {
      return res.status(400).json({ 
        error: error.error?.message || error.message 
      });
    }
    
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

