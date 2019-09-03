import { Students } from './students';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class BookslotService {
    constructor(private angularFirestore: AngularFirestore) { }

    // method to save students booking
    onSaveStudentBooking(payload) {
        return this.angularFirestore.collection('students').add(payload);
        // return this.angularFirestore.collection('teacher').snapshotChanges();
    }

    // method to save students booking
    getStudentBooking() {
        return this.angularFirestore.collection('students').snapshotChanges();
    }
    getAdminData() {
        return this.angularFirestore.collection('admin').snapshotChanges();
    }
    onUpdateBooking(){

    }
}
