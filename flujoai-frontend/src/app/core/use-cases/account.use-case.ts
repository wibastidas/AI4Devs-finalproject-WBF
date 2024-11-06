import { AccountResponse } from '@interfaces/account.response';
import { Account } from '@interfaces/account.interface';
import { environment } from '@env/environment';

export const getAllAccountsUseCase = async (): Promise<AccountResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('No se pudieron obtener las cuentas');

    const accounts = await resp.json();

    return {
      ok: true,
      accounts
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudieron obtener las cuentas'
    };
  }
};

export const getAccountByIdUseCase = async (id: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/account/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('No se pudo obtener la cuenta');

    const data = await resp.json() as Account;

    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo obtener la cuenta'
    };
  }
};

export const createAccountUseCase = async (accountData: {
  name: string;
  description: string;
  business_id: number;
}) => {
  try {
    const response = await fetch(`${environment.backendApi}/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: accountData.name,
        description: accountData.description,
        business_id: accountData.business_id
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'No se pudo crear la cuenta');
    }

    return data;
  } catch (error) {
    console.error('Error al crear cuenta:', error);
    throw error;
  }
};

export const updateAccountUseCase = async (id: string, account: Partial<Account>): Promise<AccountResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/account/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account)
    });

    if (!resp.ok) throw new Error('No se pudo actualizar la cuenta');

    const updatedAccount = await resp.json();

    return {
      ok: true,
      account: updatedAccount
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo actualizar la cuenta'
    };
  }
};

export const deleteAccountUseCase = async (id: number): Promise<AccountResponse> => {
  try {
    const resp = await fetch(`${environment.backendApi}/account/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('No se pudo eliminar la cuenta');

    return {
      ok: true
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'No se pudo eliminar la cuenta'
    };
  }
};
