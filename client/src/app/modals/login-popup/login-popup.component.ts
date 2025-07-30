import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';

declare const google: any;

@Component({
  selector: 'login-popup',
  templateUrl: 'login-popup.component.html',
  styleUrls: ['login-popup.component.scss'],
})
export class LoginPopupComponent {
  constructor(private activeModal: NgbActiveModal, private auth: AuthService) {}

  @Output() loginSuccess: EventEmitter<any> = new EventEmitter();

  triggerGoogleSignIn() {
    this.auth.googleLogin();
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
