import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashMessagesService.show('You are now logged in!', {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.flashMessagesService.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        this.router.navigate(['/login']);
      });
  }

}
