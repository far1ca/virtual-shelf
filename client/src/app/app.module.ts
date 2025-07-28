import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalsService } from './modals/modals.service';
import { FormPopupComponent } from './modals/form-popup/form-popup.component';
import { BookPopupComponent } from './modals/book-popup/book-popup.component';

@NgModule({
  declarations: [AppComponent, FormPopupComponent, BookPopupComponent],
  imports: [BrowserModule, NgbModule, FormsModule, NgbToastModule],
  providers: [ModalsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
