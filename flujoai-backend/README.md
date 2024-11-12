# FlujoAI Backend

## Descripción
FlujoAI es un sistema de gestión financiera que permite administrar múltiples negocios, cuentas y transacciones. El sistema está construido con Node.js, Express y PostgreSQL usando Sequelize como ORM.

## Requisitos Previos
- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## Configuración Inicial

1. Clonar el repositorio:

```bash
git clone https://github.com/yourusername/flujoai-backend.git
cd flujoai-backend

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo de variables de entorno:
```bash
cp .env.example .env
```

4. Configurar las variables de entorno en el archivo `.env`:
```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=flujoai
DB_USER=your_username
DB_PASSWORD=your_password
PORT=3000
```

5. Crear la base de datos en PostgreSQL:
```sql
CREATE DATABASE flujoai;
```

## Inicialización de la Base de Datos

1. Sincronizar los modelos con la base de datos:
```bash
NODE_ENV=development node src/scripts/syncDatabase.js
```

Este script creará todas las tablas necesarias basadas en los modelos definidos en:
```javascript:src/models/associations.js
startLine: 9
endLine: 25
```

2. Crear datos iniciales (negocio y usuario admin):
```bash
node src/scripts/initializeData.js
```

Este script creará:
- Un negocio inicial con ID 1 y nombre "Dtx"
- Un usuario administrador:
  - Email: admin@flujoai.com
  - Password: 123456
  - Asociado al negocio "Dtx"

## Estructura de la Base de Datos

### Modelos Principales:
- Users ↔ Businesses (Muchos a Muchos)
- Business → Accounts (Uno a Muchos)
- Business → Categories (Uno a Muchos)
- Account → AccountBalance (Uno a Uno)

## API Endpoints

### Negocios
- `POST /api/business` - Crear negocio
- `GET /api/business` - Listar negocios
- `GET /api/business/:id` - Obtener negocio por ID
- `PUT /api/business/:id` - Actualizar negocio

### Cuentas
- `POST /api/accounts` - Crear cuenta
- `GET /api/accounts` - Listar cuentas
- `GET /api/accounts/:id` - Obtener cuenta por ID
- `PUT /api/accounts/:id` - Actualizar cuenta

### Transacciones
- `POST /api/transactions` - Crear transacción
  - Automáticamente actualiza el balance de la cuenta asociada

## Ejecutar el Servidor

1. En modo desarrollo:
```bash
npm run dev
```


2. Crear datos iniciales (negocio y usuario admin):

bash
node src/scripts/initializeData.js


Este script creará:
- Un negocio inicial con ID 1 y nombre "Dtx"
- Un usuario administrador:
  - Email: admin@flujoai.com
  - Password: 123456
  - Asociado al negocio "Dtx"

## Estructura de la Base de Datos

### Modelos Principales:
- Users ↔ Businesses (Muchos a Muchos)
- Business → Accounts (Uno a Muchos)
- Business → Categories (Uno a Muchos)
- Account → AccountBalance (Uno a Uno)

## API Endpoints

### Negocios
- `POST /api/business` - Crear negocio
- `GET /api/business` - Listar negocios
- `GET /api/business/:id` - Obtener negocio por ID
- `PUT /api/business/:id` - Actualizar negocio

### Cuentas
- `POST /api/accounts` - Crear cuenta
- `GET /api/accounts` - Listar cuentas
- `GET /api/accounts/:id` - Obtener cuenta por ID
- `PUT /api/accounts/:id` - Actualizar cuenta

### Transacciones
- `POST /api/transactions` - Crear transacción
  - Automáticamente actualiza el balance de la cuenta asociada

## Ejecutar el Servidor

1. En modo desarrollo:
bash
npm run dev


2. En modo producción:


El servidor estará disponible en `http://localhost:3000`

## Pruebas

Para ejecutar las pruebas:
bash
npm test

