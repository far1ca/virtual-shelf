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
    /*.subscribe({
      next: (response) => {
        console.log('Google login successful:', response);
        this.loginSuccess.emit(response);
        this.close();
      },
      error: (error) => {
        console.error('Google login failed:', error);
        // Handle error appropriately, e.g., show a notification
      },
    });*/
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
