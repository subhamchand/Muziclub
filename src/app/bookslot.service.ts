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
    };

    startTimesArray = [
      {
        day: 'sunday',
        times : [
          {
            title: '9 AM',
            value: '9:00:00 AM'
          },
          {
            title: '9:30 AM',
            value: '9:30:00 AM'
          },
      ]
      },
      {
        day: 'monday',
        times : [
          {
            title: '8:30 AM',
            value: '08:30:00'
          },
          {
            title: '9 AM',
            value: '09:00:00'
          },
          {
            title: '9:30 AM',
            value: '09:30:00'
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
      },
      {
        day: 'tuesday',
        times : [
          {
            title: '11 PM',
            value: '11:00:00 AM'
          },
          {
            title: '12:30 AM',
            value: '12:30:00 AM'
          },
      ]
      }
    ];

    endTimesArray = [
      {
        day: 'monday',
        times : [
          {
            title: '9 AM',
            value: '09:00:00'
          },
          {
            title: '9:30 AM',
            value: '09:30:00'
          },
          {
            title: '10 AM',
            value: '10:00:00'
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
            title: '12 PM',
            value: '12:00:00 PM'
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
          },
          {
            title: '10 PM',
            value: '10:00:00 PM'
          },
      ]
      }
    ] ;
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

  getStartTimesArray(day) {
    return  this.startTimesArray.filter( time => time.day === day);
  }

  getEndTimesArray(day) {
    return  this.endTimesArray.filter( time => time.day === day);
  }
}
