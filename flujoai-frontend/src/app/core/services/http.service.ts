import { Injectable } from '@angular/core';
import { AuthService } from '@services/AuthService.service';
import { apiRequest } from '../helpers/api.helper';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private authService: AuthService) {}

  request(endpoint: string, options: RequestInit = {}) {
    return apiRequest(
      endpoint, 
      options, 
      () => this.authService.getToken()
    );
  }
}