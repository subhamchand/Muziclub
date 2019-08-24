import { Students } from './students';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookslotService {

  teacher = {
      name: 'Subham Chand',
      classes: [
        {
          day: 'Thursday',
          starttime: new Date(),
          endtime: new Date()
        },
        {
          day: 'Friday',
          starttime: new Date(),
          endtime: new Date()
        },
        {
          day: 'Saturday',
          starttime: new Date(),
          endtime: new Date()
        },
        {
          day: 'Sunday',
          starttime: new Date(),
          endtime: new Date()
        }
      ]
    }
    ;
  constructor(private angularFirestore: AngularFirestore) { }

  onSave() {
    this.angularFirestore.collection('teacher').add(this.teacher);
    // return this.angularFirestore.collection('teacher').snapshotChanges();
  }
}
