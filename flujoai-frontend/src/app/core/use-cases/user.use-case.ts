import { UserResponse } from '@app/interfaces/user.response';
import { User } from '@app/interfaces/user.interface';
import { apiRequest } from '../helpers/api.helper';

export const getAllUsersUseCase = async (): Promise<UserResponse> => {
  try {
    const resp = await apiRequest('/users');
    if (!resp.ok) throw new Error('No se pudieron obtener los usuarios');
    const users = await resp.json();
    return { ok: true, users };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'No se pudieron obtener los usuarios' };
  }
};

export const getUserByIdUseCase = async (id: string): Promise<UserResponse> => {
  try {
    const resp = await apiRequest(`/users/${id}`);
    if (!resp.ok) {
      const data = await resp.json();
      return { ok: false, error: data.message || 'No se pudo obtener el usuario' };
    }
    const user = await resp.json();
    return { ok: true, user };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'No se pudo obtener el usuario' };
  }
};

export const createUserUseCase = async (userData: {
  email: string;
  password: string;
}): Promise<UserResponse> => {
  try {
    const resp = await apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify({
        username: userData.email.split('@')[0],
        email: userData.email,
        password: userData.password
      })
    });

    const data = await resp.json();
    
    if (!resp.ok) {
      return { ok: false, error: data.message || 'No se pudo crear el usuario' };
    }

    return { ok: true, user: data };
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return { ok: false, error: 'No se pudo crear el usuario' };
  }
};

export const updateUserUseCase = async (
  id: string,
  userData: Partial<User>
): Promise<UserResponse> => {
  try {
    const resp = await apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { ok: false, error: data.message || 'No se pudo actualizar el usuario' };
    }

    return { ok: true, user: data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'No se pudo actualizar el usuario' };
  }
};

export const deleteUserUseCase = async (id: string): Promise<UserResponse> => {
  try {
    const resp = await apiRequest(`/users/${id}`, {
      method: 'DELETE'
    });

    if (!resp.ok) {
      const data = await resp.json();
      return { ok: false, error: data.message || 'No se pudo eliminar el usuario' };
    }

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error: 'No se pudo eliminar el usuario' };
  }
};

export const loginUseCase = async (credentials: {
  email: string;
  password: string;
}): Promise<UserResponse> => {
  try {
    const resp = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    const data = await resp.json();
    
    if (!resp.ok) {
      return { 
        ok: false, 
        error: data.error || 'Credenciales inválidas' 
      };
    }

    localStorage.setItem('token', data.token);
    
    return { 
      ok: true, 
      user: data.user,
      token: data.token 
    };
  } catch (error) {
    console.error('Error en login:', error);
    return { 
      ok: false, 
      error: 'Error al intentar iniciar sesión' 
    };
  }
};
