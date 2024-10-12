# Documento de Requisitos del Producto (PRD)

## 1. Introducción y Objetivos

**Introducción:**

"**FlujoAI**" es una aplicación diseñada para pequeños emprendedores que buscan simplificar y automatizar la gestión de su flujo de caja. La necesidad surge de transformar un Excel sencillo, utilizado para registrar ingresos y gastos por cuenta (bancos, MercadoLibre, efectivo, etc.), en una herramienta más potente que no solo permita el registro de movimientos, sino que también añada funcionalidades básicas pero esenciales.

**Objetivos:**

- **Crear una herramienta visualmente atractiva y fácil de usar**, dirigida a pequeños emprendedores que venden productos por ecommerce, WhatsApp y redes sociales.
- **Simplificar la gestión financiera**, permitiendo registrar ingresos y gastos, calcular saldos y generar reportes automáticos.
- **Integrar inteligencia artificial** para generar reportes personalizados, predicciones de flujo de caja y recomendaciones, utilizando la API de OpenAI ChatGPT.
- **Desarrollar un MVP en menos de 30 horas**, enfocado en funcionalidades clave que aporten mayor valor y sean atractivas para inversionistas en una presentación tipo Shark Tank.
- **Mantener bajos costos** en infraestructura y mantenimiento, asegurando rapidez y eficiencia en el procesamiento de datos.

---

## 2. Stakeholders

- **Usuarios Finales:**
  - Pequeños emprendedores que necesitan gestionar su flujo de caja de manera sencilla y eficiente.
- **Inversionistas:**
  - Audiencia tipo Shark Tank a quienes se les presentará el MVP.
- **Equipo de Desarrollo:**
  - Desarrollador principal con experiencia en Angular y conocimientos básicos de backend.

---

## 3. Historias de Usuarios

1. **Registro de Transacciones:**
   - *Como* emprendedor, *quiero* poder registrar ingresos y gastos por cuenta (bancos, MercadoLibre, efectivo, etc.), *para* llevar un control de mis transacciones financieras.

2. **Visualización de Saldos:**
   - *Como* usuario, *deseo* ver los saldos actualizados por cuenta y un saldo total consolidado, *para* conocer mi situación financiera en tiempo real.

3. **Generación de Reportes:**
   - *Como* emprendedor, *quiero* generar reportes mensuales y de períodos anteriores, *para* analizar el desempeño financiero de mi negocio.

4. **Asistente Inteligente:**
   - *Como* usuario, *me gustaría* interactuar con un asistente inteligente que responda preguntas sobre mi flujo de caja y me provea recomendaciones basadas en los datos de mi negocio.

---

## 4. Características y Funcionalidades

### Funcionalidades Clave para el MVP:

1. **Registro Simplificado de Ingresos y Gastos:**
   - Interfaz intuitiva para cargar ingresos y gastos por cuenta.
   - Precarga de cuentas bancarias, conceptos de gastos y productos más comunes.

2. **Cálculo Automático de Saldos y Visualización:**
   - Mostrar saldos actualizados por cuenta y saldo total consolidado.
   - Visualizaciones gráficas básicas (gráficos de barras o pastel) que faciliten la comprensión de la situación financiera.

3. **Generación de Reportes Automáticos:**
   - Generación de informes mensuales del mes actual y de períodos anteriores.
   - Opción de exportar reportes en formato PDF.

4. **Integración de IA con OpenAI ChatGPT:**
   - Implementación de un asistente virtual que responda preguntas básicas sobre el flujo de caja.
   - Proporcionar recomendaciones personalizadas basadas en los datos ingresados.

5. **Interfaz de Usuario Atractiva y Presentable:**
   - Diseño visual moderno y profesional.
   - Flujo de navegación claro y sencillo.

---

## 5. Requisitos Técnicos

1. **Frontend:**
   - Desarrollo de la interfaz de usuario utilizando **Angular**, aprovechando la experiencia existente del desarrollador.

2. **Backend:**
   - Uso de **Firebase** como Backend as a Service (BaaS) para reducir el tiempo de desarrollo y mantenimiento.
   - **Base de Datos:** Firebase Firestore para almacenamiento de datos en tiempo real y operaciones CRUD simplificadas.

3. **Integración de IA:**
   - Implementación de **Firebase Cloud Functions** para interactuar con la API de OpenAI ChatGPT.
   - Mantener las claves de API y lógica sensible en el backend para mayor seguridad.

4. **Hosting:**
   - **Firebase Hosting** para servir la aplicación Angular y las funciones en la nube de manera rápida y segura.

5. **Rendimiento y Escalabilidad:**
   - La solución debe ser rápida en respuestas y procesamiento de datos.
   - Mantener bajos costos en infraestructura y mantenimiento, con capacidad de escalar según sea necesario.

---

## 6. Criterios de Aceptación

- **Tiempo de Desarrollo:**
  - El MVP debe ser desarrollado en **menos de 30 horas de trabajo**.

- **Funcionalidades Implementadas:**
  - Registro de ingresos y gastos por cuenta.
  - Cálculo automático de saldos y visualización gráfica básica.
  - Generación de reportes mensuales y exportación a PDF.
  - Implementación de un asistente inteligente que responda preguntas básicas y provea recomendaciones.

- **Interfaz de Usuario:**
  - La aplicación debe tener una interfaz atractiva, moderna y fácil de usar.
  - El flujo de navegación debe ser intuitivo para el usuario final.

- **Rendimiento:**
  - La aplicación debe ser rápida en sus respuestas y en el procesamiento de datos.

- **Presentación para Inversionistas:**
  - El MVP debe estar listo para ser presentado a una audiencia tipo Shark Tank, demostrando el potencial de la idea y las funcionalidades clave.

- **Costos y Mantenimiento:**
  - La solución debe mantener bajos costos en infraestructura y requerir mínimo mantenimiento.

---
