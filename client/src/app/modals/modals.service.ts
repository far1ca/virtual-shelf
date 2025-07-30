import { EventEmitter, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormPopupComponent } from './form-popup/form-popup.component';
import { BookPopupComponent } from './book-popup/book-popup.component';
import { Book } from '../app.component';
import { BehaviorSubject } from 'rxjs';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { AuthService } from './login-popup/auth.service';

@Injectable({ providedIn: 'root' })
export class ModalsService {
  bookList = new BehaviorSubject<Book[][]>([[], [], [], [], []]);
  showToast = new EventEmitter<boolean>();
  bookRows: Book[][] = [[], [], [], [], []];
  pos = 0;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  open(type: string, book?: Book, pos?: number) {
    if (pos) this.pos = pos;
    switch (type) {
      case 'form': {
        const modalRef = this.modalService.open(FormPopupComponent, {
          ariaLabelledBy: 'addBook-form',
          centered: true,
        });
        modalRef.componentInstance.bookForm.subscribe(
          (form: {
            form: {
              value: { rowNumber: number; name: any; color: any; desc: any };
            };
          }) => {
            this.bookRows = this.bookList.getValue();
            if (
              this.bookRows[form.form.value.rowNumber - 1].length ===
              (form.form.value.rowNumber === 4 ? 18 : 15)
            )
              this.showToast.emit(true);
            else {
              this.bookRows[form.form.value.rowNumber - 1].push({
                name: form.form.value.name,
                color: form.form.value.color,
                desc: form.form.value.desc,
              });
              this.authService.updateUserBooks(this.bookRows);
            }
          }
        );
        break;
      }
      case 'bookInfo': {
        const modalRef = this.modalService.open(BookPopupComponent, {
          ariaLabelledBy: 'editBook-form',
          centered: true,
        });
        modalRef.componentInstance.book = book;
        modalRef.componentInstance.removeCurrent.subscribe(() => {
          const row = this.pos / 15;
          this.bookRows = this.bookList.getValue();
          this.bookRows[row] = this.bookRows[row].slice(
            this.pos - row * 15,
            this.pos - row * 15
          );
          this.authService.updateUserBooks(this.bookRows);
        });
        break;
      }
      case 'login': {
        this.modalService.open(LoginPopupComponent, {
          ariaLabelledBy: 'login-form',
          centered: true,
        });
      }
    }
  }
}
