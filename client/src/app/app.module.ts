import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalsService } from './modals/modals.service';
import { FormPopupComponent } from './modals/form-popup/form-popup.component';
import { BookPopupComponent } from './modals/book-popup/book-popup.component';
import { LoginPopupComponent } from './modals/login-popup/login-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    FormPopupComponent,
    BookPopupComponent,
    LoginPopupComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NgbToastModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: '', component: AppComponent }]),
  ],
  providers: [ModalsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
