import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { secret } from '../environments/secret';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: secret.apiKey,
      authDomain: secret.authDomain
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
