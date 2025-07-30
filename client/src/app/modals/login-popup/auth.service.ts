import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3333';

  googleLogin() {
    window.location.href = 'http://localhost:3333/auth/google';
  }
}
