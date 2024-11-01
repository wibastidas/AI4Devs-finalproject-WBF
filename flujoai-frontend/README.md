# FlujoAI Frontend

Este proyecto es el frontend de FlujoAI, una aplicación diseñada para gestionar cuentas, transacciones, usuarios, negocios y categorías. Está construido utilizando React y otras tecnologías modernas de frontend.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/flujoai-frontend.git
   cd flujoai-frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## Ejecución del Proyecto

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`.

## Estructura del Proyecto

El proyecto sigue una arquitectura basada en componentes y principios de Clean Architecture, organizada de la siguiente manera:

- **src/core/**: Contiene la lógica de negocio central.
  - **models/**: Define las entidades principales del sistema.
  - **use-cases/**: Implementa los casos de uso específicos de la aplicación.

- **src/interfaces/**: Define los contratos y las interfaces.
  - **repositories/**: Interfaces para el acceso a datos.

- **src/presentations/**: Maneja la capa de presentación.
  - **components/**: Componentes reutilizables.
  - **layouts/**: Estructuras de página.
  - **pages/**: Páginas principales.
  - **services/**: Servicios para comunicación con el backend.

Esta estructura permite una separación clara de responsabilidades y facilita el mantenimiento y escalabilidad del proyecto.

## Notas Adicionales

- Asegúrate de que el backend esté corriendo antes de iniciar el frontend para evitar errores de conexión.
- Puedes configurar las variables de entorno en un archivo `.env` en la raíz del proyecto para personalizar la configuración del entorno.


graph TD;
    A[src/app] --> B[core]
    B --> C[models]
    C --> D[Account.ts]
    C --> E[Business.ts]
    C --> F[Category.ts]
    C --> G[Transaction.ts]
    C --> H[User.ts]
    B --> I[use-cases]
    I --> J[account]
    J --> K[CreateAccount.ts]
    J --> L[GetAccount.ts]
    J --> M[UpdateAccount.ts]
    I --> N[business]
    N --> O[CreateBusiness.ts]
    N --> P[GetBusiness.ts]
    N --> Q[UpdateBusiness.ts]
    I --> R[transaction]
    R --> S[CreateTransaction.ts]
    R --> T[GetTransaction.ts]
    R --> U[UpdateTransaction.ts]
    A --> V[interfaces]
    V --> W[repositories]
    W --> X[IAccountRepository.ts]
    W --> Y[IBusinessRepository.ts]
    W --> Z[ICategoryRepository.ts]
    W --> AA[ITransactionRepository.ts]
    W --> AB[IUserRepository.ts]
    A --> AC[presentations]
    AC --> AD[components]
    AD --> AE[account]
    AD --> AF[business]
    AD --> AG[category]
    AD --> AH[transaction]
    AC --> AI[layouts]
    AI --> AJ[MainLayout.ts]
    AC --> AK[pages]
    AK --> AL[accounts]
    AK --> AM[businesses]
    AK --> AN[categories]
    AK --> AO[transactions]
    AC --> AP[services]
    AP --> AQ[AccountService.ts]
    AP --> AR[BusinessService.ts]
    AP --> AS[CategoryService.ts]
    AP --> AT[TransactionService.ts]