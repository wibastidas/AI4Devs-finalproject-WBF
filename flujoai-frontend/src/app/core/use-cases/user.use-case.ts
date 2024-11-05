import { UserResponse } from '@app/interfaces/user.response';
import { User } from '@app/interfaces/user.interface';
import { environment } from '@env/environment';

export const getAllUsersUseCase = async (): Promise<UserResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('Error al obtener los usuarios');
    const users = await resp.json();
    return { ok: true, users };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al obtener los usuarios' };
  }
};

export const getUserByIdUseCase = async (id: string): Promise<UserResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) {
      if (resp.status === 404) {
        return { ok: false, error: 'Usuario no encontrado' };
      }
      throw new Error('Error al obtener el usuario');
    }
    const user = await resp.json();
    return { ok: true, user };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al obtener el usuario' };
  }
};

export const createUserUseCase = async (
  user: Omit<User, 'id' | 'created_at' | 'updated_at'>
): Promise<UserResponse> => {
  try {
    if (!user.username || !user.email || !user.password || !user.business_id) {
      return { ok: false, error: 'Datos inválidos' };
    }

    const resp = await fetch(`${environment.backendApi}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!resp.ok) throw new Error('Error al crear el usuario');
    const newUser = await resp.json();
    return { ok: true, user: newUser };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al crear el usuario' };
  }
};

export const updateUserUseCase = async (
  id: string,
  user: Partial<User>
): Promise<UserResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!resp.ok) {
      if (resp.status === 404) {
        return { ok: false, error: 'Usuario no encontrado' };
      }
      throw new Error('Error al actualizar el usuario');
    }
    const updatedUser = await resp.json();
    return { ok: true, user: updatedUser };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al actualizar el usuario' };
  }
};

export const deleteUserUseCase = async (id: string): Promise<UserResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) {
      if (resp.status === 404) {
        return { ok: false, error: 'Usuario no encontrado' };
      }
      throw new Error('Error al eliminar el usuario');
    }
    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'Error al eliminar el usuario' };
  }
};
