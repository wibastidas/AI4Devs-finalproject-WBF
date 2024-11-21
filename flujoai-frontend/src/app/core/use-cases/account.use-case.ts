import { AccountResponse } from '@interfaces/account.response';
import { Account } from '@interfaces/account.interface';
import { apiRequest } from '../helpers/api.helper';
import { CreateAccountDTO } from '@interfaces/account.interface';

type GetTokenFn = () => string | null;

export const getAllAccountsUseCase = async (getToken: GetTokenFn): Promise<AccountResponse> => {
  try {
    const resp = await apiRequest('/accounts', {}, getToken);
    if (!resp.ok) throw new Error('No se pudieron obtener las cuentas');
    const accounts = await resp.json();
    return { ok: true, accounts };
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'No se pudieron obtener las cuentas' };
  }
};

export const getAccountByIdUseCase = async (id: string, getToken: GetTokenFn): Promise<AccountResponse> => {
  try {
    const resp = await apiRequest(`/accounts/${id}`, {}, getToken);
    if (!resp.ok) throw new Error('No se pudo obtener la cuenta');
    const data = await resp.json();
    return { ok: true, account: data };
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'No se pudo obtener la cuenta' };
  }
};

export const createAccountUseCase = async (
  accountData: CreateAccountDTO, 
  getToken: GetTokenFn
): Promise<AccountResponse> => {
  try {
    const resp = await apiRequest('/accounts', {
      method: 'POST',
      body: JSON.stringify(accountData)
    }, getToken);

    const data = await resp.json();
    
    if (!resp.ok) {
      return { ok: false, error: data.message || 'No se pudo crear la cuenta' };
    }

    return { ok: true, account: data };
  } catch (error) {
    console.error('Error al crear cuenta:', error);
    return { ok: false, error: 'No se pudo crear la cuenta' };
  }
};

export const updateAccountUseCase = async (
  id: string, 
  account: Partial<Account>,
  getToken: GetTokenFn
): Promise<AccountResponse> => {
  try {
    const resp = await apiRequest(`/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(account)
    }, getToken);

    if (!resp.ok) throw new Error('No se pudo actualizar la cuenta');
    const updatedAccount = await resp.json();
    return { ok: true, account: updatedAccount };
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'No se pudo actualizar la cuenta' };
  }
};

export const deleteAccountUseCase = async (
  id: number,
  getToken: GetTokenFn
): Promise<AccountResponse> => {
  try {
    const resp = await apiRequest(`/accounts/${id}`, {
      method: 'DELETE'
    }, getToken);

    if (!resp.ok) throw new Error('No se pudo eliminar la cuenta');
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, error: 'No se pudo eliminar la cuenta' };
  }
};
