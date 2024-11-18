# Database Schema Documentation

## Modelos Principales

### User
{
  "id": "UUID PRIMARY KEY",
  "username": "STRING NOT NULL",
  "email": "STRING UNIQUE NOT NULL",
  "password": "STRING NOT NULL",
  "created_at": "TIMESTAMP",
  "updated_at": "TIMESTAMP"
}

### Business
{
  "id": "UUID PRIMARY KEY",
  "name": "STRING NOT NULL",
  "description": "STRING",
  "created_at": "TIMESTAMP",
  "updated_at": "TIMESTAMP"
}

### Account
{
  "id": "UUID PRIMARY KEY",
  "business_id": "UUID FOREIGN KEY",
  "name": "STRING NOT NULL",
  "description": "STRING",
  "created_at": "TIMESTAMP",
  "updated_at": "TIMESTAMP"
}

### Transaction
{
  "id": "UUID PRIMARY KEY",
  "account_id": "UUID FOREIGN KEY",
  "category_id": "UUID FOREIGN KEY",
  "amount": "DECIMAL NOT NULL",
  "type": "ENUM('income', 'expense')",
  "description": "STRING",
  "date": "TIMESTAMP",
  "created_at": "TIMESTAMP",
  "updated_at": "TIMESTAMP"
}

## Relaciones

1. **User <-> Business** (Many-to-Many)
   - Tabla intermedia: user_businesses
   - Campos: user_id, business_id

2. **Business -> Account** (One-to-Many)
   - Foreign key en Account: business_id

3. **Account -> Transaction** (One-to-Many)
   - Foreign key en Transaction: account_id

## Scripts de Base de Datos

### Sincronización
El script syncDatabase.js maneja la sincronización de todos los modelos con la base de datos.

### Migración de Balances
El script migrateAccountBalances.js gestiona la migración y actualización de balances de cuentas.

### Inicialización de Datos
El script initializeData.js crea los datos iniciales necesarios para el sistema.
