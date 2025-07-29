import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3333';

  googleLogin(token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/google-login`, { token });
  }
}
