import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';

declare const google: any;

@Component({
  selector: 'login-popup',
  templateUrl: 'login-popup.component.html',
  styleUrls: ['login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
  constructor(private activeModal: NgbActiveModal, private auth: AuthService) {}

  ngOnInit(): void {
    this.initializeGoogleSignin();
  }

  initializeGoogleSignin() {
    debugger;
    google.accounts.id.initialize({
      client_id:
        '781996775442-gobv9i3kjn25d9g4qpk0m9h9ndtjin1d.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
    });

    google.accounts.id.prompt();
  }

  triggerGoogleSignIn() {
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Try manual rendering
        google.accounts.id.renderButton(
          document.getElementById('googleLoginButton'),
          { theme: 'outline', size: 'large', text: 'continue_with' }
        );
      }
    });
  }
  handleCredentialResponse(response: any) {
    this.auth.googleLogin(response.credential).subscribe(
      (res) => {
        if (res.isNewUser) {
          // Handle new user registration
          console.log('New user registered via Google');
        } else {
          // Handle existing user login
          console.log('Existing user logged in via Google');
        }
        window.location.reload();
      },
      (error) => {
        console.error('Google authentication failed', error);
      }
    );
  }

  close(): void {
    this.activeModal.dismiss();
  }

  triggerGoogleSignin() {}
}
