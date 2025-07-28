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
    color: '#1d6500',
    desc: 'A mysterious tale set in an enchanted forest.',
  };
  show = false;
  heightSizes: number[] = [87, 83, 92, 100, 94];
  heightMargin: number[] = [0, 20.5, 40, 61];
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
    [this.placeholder],
    [this.placeholder],
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
      this.placeholder,
      this.placeholder,
      this.placeholder,
    ],
  ];

  submitForm(form: any): void {
    console.log(form.form.value);
    if (
      this.bookRows[form.form.value.rowNumber - 1].length ===
      (form.form.value.rowNumber === 4 ? 18 : 15)
    )
      this.show = true;
    else {
      this.bookRows[form.form.value.rowNumber - 1].push({
        name: form.form.value.name,
        color: form.form.value.color,
        desc: form.form.value.desc,
      });
    }
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
