import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {}

  // Sign in with email/password
  public SignIn(email: string, password: string): any {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      }).catch((error) => {
        // window.alert(error.message);
        alert(error.message);
      });
  }

  // Sign up with email/password
  public SignUp(email: string, password: string): any {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
        this.SetUserData(result.user).then(() => {
          this.SendVerificationMail();
        });
      }).catch((error) => {
        alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  public SendVerificationMail(): any {
    return this.afAuth.currentUser.then(u => { if (u) { u.sendEmailVerification(); } })
      .then(() => {
        this.router.navigate(['verify']);
      });
  }

  // Reset Forggot password
  public ForgotPassword(passwordResetEmail: string): any {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        alert(error.message);
      });
  }

  // Sign in with Google
  public GoogleAuth(): any {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  public AuthLogin(provider: any): any {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user).then(() => {
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
        });
      }).catch((error) => {
        alert(error.message);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  public SetUserData(user: any): any {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  public SignOut(): any {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

}
