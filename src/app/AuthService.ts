import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.baseUrl}/auth/login`;
    return this.http.post(loginUrl, { email, password }, { responseType: 'text', withCredentials: true });
  }

  register(email: string, password: string, name: string): Observable<any> {
    const registerUrl = `${this.baseUrl}/auth/register`;
    return this.http.post(registerUrl, { email, password, name }, { responseType: 'text', withCredentials: true });
  }

  logout(): Observable<any> {
    const logoutUrl = `${this.baseUrl}/auth/logout`;
    return this.http.post(logoutUrl, null, { responseType: 'text', withCredentials: true });
  }

  isAuthenticated(): boolean {
    // Check if a session exists
    return sessionStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): any {
    // Retrieve current user from session
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  setCurrentUser(user: any): void {
    // Set current user in session
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearCurrentUser(): void {
    // Clear current user from session
    sessionStorage.removeItem('currentUser');
  }
}
