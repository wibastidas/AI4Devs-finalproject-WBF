const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    console.log('🔑 Verificando token:', token ? 'Presente' : 'No presente');

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu-secreto-jwt');
    
    console.log('👤 Token decodificado:', {
      id: decoded.id,
      business_id: decoded.business_id
    });

    req.user = {
      id: decoded.id,
      business_id: decoded.business_id
    };

    next();
  } catch (error) {
    console.error('❌ Error de autenticación:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware;