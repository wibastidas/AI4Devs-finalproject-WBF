import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor() {}

  // Obtener todos los usuarios
  getAllUsers() {
    // TODO: Implementar llamada al caso de uso
  }

  // Obtener un usuario por ID
  getUserById(id: string) {
    // TODO: Implementar llamada al caso de uso
  }

  // Crear nuevo usuario
  createUser(user: any) {
    // TODO: Implementar llamada al caso de uso
  }

  // Actualizar usuario existente
  updateUser(id: string, user: any) {
    // TODO: Implementar llamada al caso de uso
  }

  // Eliminar usuario
  deleteUser(id: string) {
    // TODO: Implementar llamada al caso de uso
  }

  // Métodos adicionales específicos para usuarios
  login(credentials: any) {
    // TODO: Implementar llamada al caso de uso
  }

  logout() {
    // TODO: Implementar llamada al caso de uso
  }

  resetPassword(email: string) {
    // TODO: Implementar llamada al caso de uso
  }
}
