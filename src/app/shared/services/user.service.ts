import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubscription: Subscription | null = null;

  private readonly userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public readonly user$: Observable<User | null> = this.userSubject.asObservable();


  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.subscribeUserData();
  }

  private subscribeUserData(): void {
    this.auth.user.subscribe(user => {
      if (!user) { return; }
      const userId = user?.uid;
      if (this.userSubscription !== null) { this.userSubscription.unsubscribe(); }
      this.userSubscription = this.afs.doc(`users/${userId}`).snapshotChanges().pipe(
        map(action => {
          const data = action.payload.data();
          const id = action.payload.id;
          return { id, ...data as any };
        })
      )
        .subscribe((data: User) => {
          this.userSubject.next(data);
        });
    });
  }

  public getLastValue(): User | null {
    return this.userSubject.value;
  }
}
