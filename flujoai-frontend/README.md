# FlujoAI Frontend

Este proyecto es el frontend de FlujoAI, una aplicación de gestión financiera inteligente construida con Angular 17. Integra un asistente financiero AI que ayuda a analizar y gestionar las finanzas de manera interactiva.

## Características Principales

- Dashboard financiero interactivo
- Gestión de cuentas y transacciones
- Categorización inteligente de gastos
- Asistente financiero AI con capacidades de:
  - Análisis de estado financiero
  - Monitoreo de balances
  - Análisis de gastos por categoría
  - Recomendaciones personalizadas

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm (versión 8 o superior)
- Angular CLI (versión 17)

## Instalación

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Configura las variables de entorno:
   ```bash
   cp .env.example .env
   ```
   Configura:
   - OPENAI_API_KEY
   - BACKEND_URL
   - ENVIRONMENT

## Estructura del Proyecto

La aplicación sigue los principios de Clean Architecture:

- **core/**: Lógica de negocio y modelos
- **interfaces/**: Contratos y repositorios
- **presentations/**:
  - **components/**: Componentes reutilizables
  - **pages/**: Páginas de la aplicación
  - **services/**: Servicios de comunicación
  - **layouts/**: Plantillas base
  - **assistant/**: Componentes del asistente AI

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación
- `npm run test`: Ejecuta pruebas unitarias
- `npm run lint`: Verifica el código

## Documentación Adicional

- [Guía del Asistente AI](./docs/ai-assistant.md)
- [Arquitectura del Frontend](./docs/architecture.md)
- [Guía de Contribución](./CONTRIBUTING.md)