import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'form-popup',
  templateUrl: 'form-popup.component.html',
})
export class FormPopupComponent {
  constructor(private activeModal: NgbActiveModal) {}
  @Output() bookForm: EventEmitter<any> = new EventEmitter();

  submitForm(form: any): void {
    this.bookForm.emit(form);
    form.reset();
    this.close();
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
