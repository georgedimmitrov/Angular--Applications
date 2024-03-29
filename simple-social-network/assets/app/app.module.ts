import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth/auth.service';
import { ErrorService } from './errors/error.service';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { ErrorComponent } from './errors/error.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';
import { MessageModule } from './messages/message.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,

    ErrorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    MessageModule
  ],
  providers: [AuthService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule {}
