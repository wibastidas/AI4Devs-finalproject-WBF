# API Documentation

## Autenticación

### Login
- **Endpoint**: `POST /api/auth/login`
- **Body**: 

json
{
"email": "string",
"password": "string"
}

- **Response**: 

json
{
"token": "string",
"user": {
"id": "uuid",
"email": "string",
"username": "string"
}
}


### Registro
- **Endpoint**: `POST /api/auth/register`
- **Body**:

json
{
"email": "string",
"password": "string",
"username": "string"
}

