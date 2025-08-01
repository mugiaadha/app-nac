import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private userEmailSubject = new BehaviorSubject<string | null>(null);

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get userEmail$(): Observable<string | null> {
    return this.userEmailSubject.asObservable();
  }

  login(email: string, password: string): boolean {
    // Dummy login logic, replace with real API call
    if (email && password) {
      this.isLoggedInSubject.next(true);
      this.userEmailSubject.next(email);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.userEmailSubject.next(null);
  }
}
