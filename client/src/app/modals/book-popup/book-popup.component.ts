import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../app.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'book-popup',
  templateUrl: 'book-popup.component.html',
  styleUrls: ['book-popup.component.scss'],
})
export class BookPopupComponent {
  constructor(private activeModal: NgbActiveModal) {}

  @Input() book: Book = { name: '', color: '', desc: '' };
  @Output() removeCurrent = new EventEmitter();

  close(): void {
    this.activeModal.dismiss();
  }

  removeBook(): void {
    this.removeCurrent.emit();
    this.close();
  }
}
