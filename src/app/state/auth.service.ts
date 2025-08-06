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
  private apiUrl = 'https://backend.nacademy.my.id/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private userSubject = new BehaviorSubject<User | null>(
    this.getUserFromToken()
  );

  constructor(private http: HttpClient) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  get userEmail$(): Observable<string | null> {
    return this.userSubject.pipe(map((user) => (user ? user.email : null)));
  }

  login(email: string, password: string): Observable<boolean> {
    const loginData = { email, password };

    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        map((response) => {
          if (response.success && response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.isLoggedInSubject.next(true);
            this.userSubject.next(response.data.user);
            return true;
          }
          return false;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return of(false);
        })
      );
  }

  logout(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      // Jika tidak ada token, langsung logout local
      this.clearLocalAuth();
      return of(true);
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      map(() => {
        this.clearLocalAuth();
        return true;
      }),
      catchError((error) => {
        this.clearLocalAuth();
        return of(true);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private getUserFromToken(): User | null {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData || null;
      } catch {
        return null;
      }
    }
    return null;
  }

  private clearLocalAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.userSubject.next(null);
  }
}
