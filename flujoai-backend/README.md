# FlujoAI Backend

Sistema de gestión financiera con integración de IA, construido con Node.js, Express y PostgreSQL. Incluye un asistente financiero potenciado por OpenAI.

## Características Principales

- API RESTful completa
- Integración con OpenAI para asistencia financiera
- Sistema de autenticación JWT
- Gestión de múltiples negocios
- Análisis financiero automatizado

## Requisitos Previos

- Node.js (v16 o superior)
- PostgreSQL (v13 o superior)
- OpenAI API Key

## Configuración

1. Instalación base
2. Variables de entorno:
   ```env
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=flujoai
   DB_USER=your_username
   DB_PASSWORD=your_password
   PORT=3000
   OPENAI_API_KEY=your_key
   OPENAI_ASSISTANT_ID=your_assistant_id
   ```

## API Endpoints

### Core
- `POST /api/auth/login`
- `POST /api/auth/register`

### Asistente AI
- `POST /api/assistant/thread` - Crear hilo de conversación
- `POST /api/assistant/question` - Realizar consulta al asistente

### Finanzas
[Mantener los endpoints existentes]

## Funciones del Asistente

El asistente puede:
- Analizar estados financieros
- Generar reportes
- Ofrecer recomendaciones
- Responder consultas financieras

## Desarrollo

- `npm run dev`: Modo desarrollo
- `npm start`: Producción
- `npm test`: Pruebas
- `npm run migrate`: Migraciones

## Documentación

- [API Documentation](./docs/api.md)
- [Assistant Functions](./docs/assistant.md)
- [Database Schema](./docs/schema.md)

