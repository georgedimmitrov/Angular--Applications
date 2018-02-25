import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(public afAuth:AngularFireAuth) { }

  // Logs user in
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(
          userData => resolve(userData),
          error => reject(error)
        );
    });
  }

  // Logs user out
  logout() {
    return this.afAuth.auth.signOut();
  }

  // registers a user
  register(email, password) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(
          userData => resolve(userData),
          error => reject(error)
        );
    });
  }

  // check user status
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

}
