import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;
  public query: string | undefined;
  constructor(
    private afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<any>('skills');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit(): void {
  }

}
