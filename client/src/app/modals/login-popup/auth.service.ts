import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
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

  @Output() guestMode: boolean = false;
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

  activateGuestMode() {
    this.guestMode = true;
    localStorage.setItem('guestMode', JSON.stringify(true));
    const bookData = localStorage.getItem('bookData');
    if (!bookData) {
      this.user.next({
        _id: 'Guest',
        username: 'Guest',
        email: '',
        googleId: '',
        books: [[], [], [], []],
      });
      return;
    }
    const loadedBooks: Book[][] = JSON.parse(bookData);
    this.user.next({
      _id: 'Guest',
      username: 'Guest',
      email: '',
      googleId: '',
      books: loadedBooks,
    });
  }

  checkGuestMode() {
    const guestMode = localStorage.getItem('guestMode');
    if (guestMode) {
      this.guestMode = JSON.parse(guestMode);
      if (this.guestMode) {
        this.activateGuestMode();
      }
    }
  }

  getUserData(userId: string): void {
    if (this.guestMode) return;

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
    if (this.guestMode) {
      this.user.next({
        ...this.user.getValue(),
        books: newBooks,
      });
      localStorage.setItem('bookData', JSON.stringify(newBooks));
      return;
    }

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
