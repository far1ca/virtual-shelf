import {
  Component,
  inject,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Book {
  name: string;
  color: string;
  desc: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'virtual bookshelf';
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  placeholder: Book = {
    name: 'The Silent Grove',
    color: 'darkgreen',
    desc: 'A mysterious tale set in an enchanted forest.',
  };
  bookRows: Book[][] = [
    [
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
      this.placeholder,
    ],
  ];

  submitForm(form: any): void {
    console.log(form.form.value);
    form.reset();
    this.modalService.dismissAll();
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult.set(`Closed with: ${result}`);
        },
        (reason) => {
          this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
