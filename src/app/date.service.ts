import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    constructor(private angularFirestore: AngularFirestore) { }

    // calculate the time array for given start time and end time
    calculateTimeArray(startTime, endTime) {
        const d = new Date(); // get a date object
        const e = new Date();
        const x = d.setHours(startTime.hr, startTime.min, 0, 0); // reassign it to today's midnight
        const y = e.setHours(endTime.hr, endTime.min, 0, 0);
        const timeArr = [];
        while (d.getHours() < e.getHours()) {
            let hours: any = d.getHours();
            const minutes: any = d.getMinutes();
            hours = hours === 0 ? 12 : hours; // if it is 0, then make it 12
            let ampm = 'am';
            ampm = hours > 12 ? 'PM' : 'AM';
            hours = hours > 12 ? hours - 12 : hours; // if more than 12, reduce 12 and set am/pm flag
            hours = ('0' + hours).slice(-2); // pad with 0
            const minute = ('0' + d.getMinutes()).slice(-2); // pad with 0
            timeArr.push(hours + ':' + minute + ' ' + ampm);
            d.setMinutes(d.getMinutes() + 30); // increment by 30 minutes
        }
        return timeArr;
    }

    dateArray(timings, selectedDay) {
        let timeArray = [];
        let etimeArray = [];
        // const d = new Date();
        for( let i = 0; i < timings.length; i++){
            if (timings[i].day.toLowerCase() === selectedDay.toLowerCase()) {
                timeArray = this.calculateTimeArray(timings[i].mstartTime, timings[i].mendTime);
                etimeArray = this.calculateTimeArray(timings[i].estartTime, timings[i].eendTime);
                // console.log("the day is",timings[i].day);
                // console.log("arrayssssssssssss", timeArray, etimeArray)
            }
        }
        // const filterTimingArray = this.removedTeacherSchedule();
        const scheduleArray = [...timeArray, ...etimeArray];
        // const finalArr = _.difference(scheduleArray, filterTimingArray);
        // const arr = finalArr.filter(t => {
        //   const temp = t.split(':');
        //   temp[1].split(' ')[1] === 'pm' ? temp[0] = temp[0] + 12 : '';
        //   return t;
        // });
        // return arr;
        // console.log("dropdown array: ",scheduleArray)
        return scheduleArray;
    }

    //   removedTeacherSchedule() {
    //     const list = [];
    //     this.teacherScheduledArray.forEach(a => {
    //       a.classes.forEach(c => {
    //         if (c.day.toLowerCase() === 'thursday') {
    //           list.push(c);
    //         }
    //       });
    //     });
    //     const arrayList = [];
    //     const startTime = {
    //       hr: 18,
    //       min: 30,
    //     };
    //     const endTime = {
    //       hr: 20,
    //       min: 30,
    //     };
    //     for (let i = 0; i < list.length; i++) {
    //       const x = this.calculateTimeArray(list[i].startTime, list[i].endTime);
    //       arrayList.push(x);
    //     }
    //     const y = _.flatMapDeep(arrayList);
    //     return y;
    //   }

    // getTeacherDetailsArray() {
    //     return this.teacherScheduledArray;
    // }

    saveDateToFirebase() {
        //   for(let i = 0; i < this.dailytimes.length; i++){
        //     this.angularFirestore.collection('dailytimings').add(this.dailytimes[i]);
        //   }
    }
    getTeachersFromFirebase() {
        return this.angularFirestore.collection('teachers').snapshotChanges();
    }

    getDailyTimings() {
        return this.angularFirestore.collection('dailytimings').snapshotChanges();
    }
}
