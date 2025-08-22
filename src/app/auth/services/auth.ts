import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

interface AuthUser {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'auth_user';
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      if (username && password) {
        const user: AuthUser = {
          id: 1,
          username,
          email: `${username}@example.com`
        };
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
        observer.next(true);
        observer.complete();
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.getUserFromStorage() !== null;
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  private getUserFromStorage(): AuthUser | null {
    const user = localStorage.getItem(this.AUTH_KEY);
    return user ? JSON.parse(user) : null;
  }
}
