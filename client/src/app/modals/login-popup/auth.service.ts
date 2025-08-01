import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/app/app.component';

interface UserData {
  _id: string;
  username: string;
  email: string;
  googleId: string;
  books: Book[][];
}

interface UserResponseData {
  success: boolean;
  user: UserData;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://virtual-shelf.far1ca.hackclub.app';
  user = new BehaviorSubject<UserData>({
    _id: '',
    username: '',
    email: '',
    googleId: '',
    books: [[], [], [], [], []],
  });

  googleLogin() {
    window.location.href = this.baseUrl + '/auth/google';
  }

  getUserData(userId: string): void {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('userId', userId);

    this.http
      .get<UserResponseData>(`${this.baseUrl}/profile`, {
        params: queryParams,
      })
      .subscribe((userData) => {
        this.user.next(userData.user);
      });
  }

  updateUserBooks(newBooks: Book[][]): void {
    this.http
      .post(`${this.baseUrl}/profile/update`, {
        userId: this.user.getValue()._id,
        books: newBooks,
      })
      .subscribe((response: any) => {
        this.user.next({
          ...this.user.getValue(),
          books: newBooks,
        });
      });
  }
}
