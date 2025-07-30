import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalsService } from './modals/modals.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './modals/login-popup/auth.service';

export interface Book {
  name: string;
  color: string;
  desc: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'virtual bookshelf';
  placeholder: Book = {
    name: 'The Silent Grove',
    color: '#1d6500',
    desc: 'A mysterious tale set in an enchanted forest.',
  };
  show = false;
  heightSizes: number[] = [87, 83, 92, 100, 94];
  heightMargin: number[] = [0, 20.5, 40, 61];
  bookRows: Book[][] = [];
  bookSub: Subscription = this.authService.user.subscribe();
  toastSub: Subscription = this.modalsService.showToast.subscribe();

  constructor(
    private modalsService: ModalsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const userId = params.get('id');
      if (!userId) {
        return;
      }
      this.authService.getUserData(userId);
    });

    this.authService.user.subscribe((newData) => {
      this.bookRows = newData.books;
      this.modalsService.bookList.next(this.bookRows);
    });
    this.modalsService.showToast.subscribe((resData: boolean) => {
      this.show = resData;
    });
  }

  ngOnDestroy(): void {
    this.bookSub.unsubscribe();
  }

  openModal(type: string, book?: Book, pos?: number) {
    this.modalsService.open(type, book, pos);
  }
}
