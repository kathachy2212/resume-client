import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { RegisterRequest, LoginRequest, JwtPayload } from '../interfaces/models';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,  // Inject platformId
    private router: Router
  ) {}

  register(data: RegisterRequest) {
  return this.http.post(`${this.apiUrl}/register/`, data);
}

 checkUsername(username: string) {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-username?username=${username}`);
  }

  login(data: LoginRequest) {
    return this.http.post<{ access: string }>(`${this.apiUrl}/login/`, data).pipe(
      tap((response) => {
        if (this.isBrowser()) {
          localStorage.setItem('access_token', response.access);
          this.router.navigate(['/upload']);  // Navigate to upload page after login
        }
      })
    );
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('access_token') : null;
  }

   isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired(token);  // Check if the token is expired
  }

   private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const expirationTime = decodedToken.exp * 1000;  // Convert expiration to milliseconds
    const currentTime = Date.now();
    return currentTime > expirationTime;
  }

   private decodeToken(token: string): JwtPayload {
    return jwtDecode<JwtPayload>(token);
  }

  getUserInfo(): JwtPayload | null {
    const token = this.getToken();
    return token ? this.decodeToken(token) : null;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
