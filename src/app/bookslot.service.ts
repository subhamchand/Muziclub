import { Students } from './students';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class BookslotService {


    startTimesArray = [
        {
            day: 'monday',
            times: [
                {
                    title: '8:30 AM',
                    value: '08:30:00 AM'
                },
                {
                    title: '9 AM',
                    value: '09:00:00 AM'
                },
                {
                    title: '9:30 AM',
                    value: '09:30:00 AM'
                },
                {
                    title: '10 AM',
                    value: '10:00:00 AM'
                },
                {
                    title: '10:30 AM',
                    value: '10:30:00 AM'
                },
                {
                    title: '11 AM',
                    value: '11:00:00 AM'
                },
                {
                    title: '11:30 AM',
                    value: '11:30:00 AM'
                },
                {
                    title: '3 PM',
                    value: '3:00:00 PM'
                },
                {
                    title: '3:30 PM',
                    value: '3:30:00 PM'
                },
                {
                    title: '4 PM',
                    value: '4:00:00 PM'
                },
                {
                    title: '4:30 PM',
                    value: '4:30:00 PM'
                },
                {
                    title: '5 PM',
                    value: '5:00:00 PM'
                },
                {
                    title: '5:30 PM',
                    value: '5:30:00 PM'
                },
                {
                    title: '6 PM',
                    value: '6:00:00 PM'
                },
                {
                    title: '6:30 PM',
                    value: '6:30:00 PM'
                },
                {
                    title: '7 PM',
                    value: '7:00:00 PM'
                },
                {
                    title: '7:30 PM',
                    value: '7:30:00 PM'
                },
                {
                    title: '8 PM',
                    value: '8:00:00 PM'
                },
                {
                    title: '8:30 PM',
                    value: '8:30:00 PM'
                },
                {
                    title: '9 PM',
                    value: '9:00:00 PM'
                },
                {
                    title: '9:30 PM',
                    value: '9:30:00 PM'
                }
            ]
        }
    ];

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

    // getStartTimesArray(day) {
    //     return this.startTimesArray.filter(time => time.day === day);
    // }
    getAdminData() {
        return this.angularFirestore.collection('admin').snapshotChanges();
    }
    // getEndTimesArray(day) {
    //     return this.endTimesArray.filter(time => time.day === day);
    // }
}
