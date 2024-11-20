import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { 
  getAllUsersUseCase,
  getUserByIdUseCase,
  createUserUseCase,
  updateUserUseCase,
  deleteUserUseCase 
} from '@use-cases/index';
import { User } from '@interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor() {}

  // Obtener todos los usuarios
  getAllUsers() {
    return from(getAllUsersUseCase());
  }

  // Obtener un usuario por ID
  getUserById(id: string) {
    return from(getUserByIdUseCase(id));
  }

  // Crear nuevo usuario
  createUser(user: {
    email: string;
    password: string;
  }) {
    return from(createUserUseCase(user));
  }

  // Actualizar usuario existente
  updateUser(id: string, user: Partial<User>) {
    return from(updateUserUseCase(id, user));
  }

  // Eliminar usuario
  deleteUser(id: string) {
    return from(deleteUserUseCase(id));
  }

  // TODO: Implementar cuando estén los casos de uso
  login(credentials: { email: string; password: string }) {
    // TODO: Implementar cuando esté el caso de uso de login
  }

  logout() {
    // TODO: Implementar cuando esté el caso de uso de logout
  }

  resetPassword(email: string) {
    // TODO: Implementar cuando esté el caso de uso de reset
  }
}
