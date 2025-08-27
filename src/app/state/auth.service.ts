import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user.model';

interface LoginResponse {
  success: boolean;
  data: {
    access_token: string;
    token_type: string;
    user: User;
  };
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'https://backend.nacademy.my.id/api';

  // State management subjects
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  private readonly userSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage()
  );

  constructor(private http: HttpClient) {}

  register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, data).pipe(
      map((response) => this.handleLoginResponse(response)),
      catchError((error) => this.handleLoginError(error))
    );
  }

  // Public observables for components to subscribe to
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  get userEmail$(): Observable<string | null> {
    return this.userSubject.pipe(map((user) => user?.email || null));
  }

  // Authentication methods
  login(email: string, password: string): Observable<boolean> {
    const loginData = { email, password };

    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        map((response) => this.handleLoginResponse(response)),
        catchError((error) => this.handleLoginError(error))
      );
  }

  logout(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      // No token exists, perform local logout only
      this.performLocalLogout();
      return of(true);
    }

    // Send logout request to server
    return this.sendLogoutRequest(token).pipe(
      map(() => {
        this.performLocalLogout();
        return true;
      }),
      catchError(() => {
        // Even if server logout fails, clear local auth
        this.performLocalLogout();
        return of(true);
      })
    );
  }

  // Token management
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Private helper methods
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');

    if (!userJson) {
      return null;
    }

    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }

  private handleLoginResponse(response: LoginResponse): boolean {
    if (!response.success || !response.data.access_token) {
      return false;
    }

    // Store authentication data
    this.storeAuthData(response.data.access_token, response.data.user);

    // Update state
    this.updateAuthState(true, response.data.user);

    return true;
  }

  private handleLoginError(error: any): Observable<boolean> {
    console.error('Login error:', error);
    return of(false);
  }

  private storeAuthData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private updateAuthState(isLoggedIn: boolean, user: User | null): void {
    this.isLoggedInSubject.next(isLoggedIn);
    this.userSubject.next(user);
  }

  private sendLogoutRequest(token: string): Observable<any> {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  private performLocalLogout(): void {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Update state
    this.updateAuthState(false, null);
  }
}
