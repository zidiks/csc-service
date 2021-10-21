import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

class SkillPartItem {
  constructor(
    name: string
  ) {
    return {
      options: [],
      selectedOptions: new Set(),
      name,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }
}

class SkillObject {
  constructor() {
    return {
      name: 'Новый навык',
      droplets: [],
      parts: []
    };
  }
}

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  private addState = false;

  private lastBeData: any;
  private skillId: string | undefined;

  private partsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public parts$: Observable<any[]> = this.partsSubject.asObservable();

  private loadingStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingStatus$: Observable<boolean> = this.loadingStatusSubject.asObservable();

  public skillForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.skillForm = this.formBuilder.group({
      name: [ '', Validators.required ],
      droplets: [ '', Validators.required ]
    });
    this.route.params.subscribe((params: Params) => {
      if (params.id === 'add') {
        this.addState = true;
        this.lastBeData = new SkillObject();
        this.skillForm.get('name')?.setValue(this.lastBeData.name);
        this.skillForm.get('droplets')?.setValue(this.lastBeData.droplets);
        this.loadingStatusSubject.next(false);
        this.partsSubject.next(this.lastBeData.parts);
      } else {
        const doc: AngularFirestoreDocument = this.afs.doc<any>(`skills/${params.id}`);
        this.skillId = params.id;
        doc.snapshotChanges().pipe(
          map(a => {
            const data = a.payload.data();
            const id = a.payload.id;
            data!.parts = data!.parts.map((p: any) => {
              return Object.assign({selectedOptions: new Set(p.options)}, p);
            });
            return  {id , ...data} as any;
          })).subscribe(res => {
          this.lastBeData = res;
          this.loadingStatusSubject.next(false);
          this.skillForm.get('name')?.setValue(res.name);
          this.skillForm.get('droplets')?.setValue(res.droplets);
          this.partsSubject.next(res.parts || []);
        });
      }
    });
  }

  ngOnInit(): void {
    // this.parts$.subscribe(res => console.log(res));
  }

  public removeSkill(option: string, partId: number): void {
    const parts: any[] = this.partsSubject.value;
    parts[partId].selectedOptions.delete(option);
    parts[partId].options = Array.from(parts[partId].selectedOptions);
    this.partsSubject.next(parts);
  }

  public addSkill(partId: number): void {
    const dialogRef = this.dialog.open(AddSkillDialogComponent, {
      width: '250px',
      panelClass: 'skills-edit-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.length > 0) {
        const parts: any[] = this.partsSubject.value;
        parts[partId].selectedOptions.add(result);
        parts[partId].options = Array.from(parts[partId].selectedOptions);
        this.partsSubject.next(parts);
      }
    });
  }

  public addPart(name: string): void {
    const parts: any[] = this.partsSubject.value;
    parts.push(new SkillPartItem(name));
    this.partsSubject.next(parts);
  }

  public removePart(partId: number): void {
    const parts: any[] = this.partsSubject.value;
    parts.splice(partId, 1);
    this.partsSubject.next(parts);
  }

  public renamePart(event: any, partId: number): void {
    setTimeout(() => {
      const parts: any[] = this.partsSubject.value;
      parts[partId].name = event.target.value;
      this.partsSubject.next(parts);
    }, 0);
  }

  public saveAllChanges(): void {
    const finishedSkill = Object.assign(this.skillForm.value, { parts: this.transformParts(this.partsSubject.value) });
    if (this.addState) {
      const skillsCollection = this.afs.collection<any>('skills');
      skillsCollection.add(finishedSkill);
    } else {
      const skillRef: AngularFirestoreDocument<any> = this.afs.doc(`skills/${this.skillId}`);
      skillRef.update(finishedSkill).then((res) => {
        console.log(res);
      });
    }
  }

  private transformParts(parts: any): any {
    return parts.map((p: any) => {
      return {
        id: p.id,
        name: p.name,
        options: [...p.selectedOptions]
      };
    });
  }

}


@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill/add-skill.component.html',
  styleUrls: ['./add-skill/add-skill.component.scss']
})
export class AddSkillDialogComponent {

  public value = '';

  constructor(
    public dialogRef: MatDialogRef<AddSkillDialogComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
