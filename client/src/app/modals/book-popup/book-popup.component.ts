import { Component, Input } from '@angular/core';
import { Book } from '../../app.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'book-popup',
  templateUrl: 'book-popup.component.html',
})
export class BookPopupComponent {
  constructor(private activeModal: NgbActiveModal) {}

  @Input() book: Book = { name: '', color: '', desc: '' };

  close(): void {
    this.activeModal.dismiss();
  }
}
