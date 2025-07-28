import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalsService } from './modals/modals.service';

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
  closeResult: WritableSignal<string> = signal('');
  placeholder: Book = {
    name: 'The Silent Grove',
    color: '#1d6500',
    desc: 'A mysterious tale set in an enchanted forest.',
  };
  show = false;
  heightSizes: number[] = [87, 83, 92, 100, 94];
  heightMargin: number[] = [0, 20.5, 40, 61];
  bookRows: Book[][] = [];
  bookList = this.modalsService.bookList;
  bookSub: Subscription = this.bookList.subscribe();
  toastSub: Subscription = this.modalsService.showToast.subscribe();

  constructor(private modalsService: ModalsService) {}

  ngOnInit(): void {
    this.bookList.subscribe((newData) => {
      this.bookRows = newData;
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
