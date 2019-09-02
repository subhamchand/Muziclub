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
        // console.log("x and y", new Date(x).toString(),new Date(y).toString());
        const timeArr = [];
        while (d.getHours() <= e.getHours()) {
            let hours: any = d.getHours();
            // const minutes: any = d.getMinutes();
            hours = hours === 0 ? 12 : hours; // if it is 0, then make it 12
            let ampm = 'am';
            ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours > 12 ? hours - 12 : hours; // if more than 12, reduce 12 and set am/pm flag
            hours = ('0' + hours).slice(-2); // pad with 0
            const minute = ('0' + d.getMinutes()).slice(-2); // pad with 0
            timeArr.push(hours + ':' + minute + ' ' + ampm);
            d.setMinutes(d.getMinutes() + 30); // increment by 30 minutes
        }
        if (d.getMinutes() == 0 && e.getMinutes() == 0){
         timeArr.splice(-2)
         return timeArr;
       } else if (d.getMinutes() == 0 && e.getMinutes() == 30) {
         timeArr.splice(-1)
         return timeArr;
       } else if (d.getMinutes() == 30 && e.getMinutes() == 30) {
         timeArr.splice(-1)
         return timeArr;
       } else if (d.getMinutes() == 30 && e.getMinutes() == 0) {
         timeArr.splice(-2)
         return timeArr;
       }
    }

    dateArray(timings, selectedDay, teachersScheduledArray, studentList) {
        let timeArray = [];
        let etimeArray = [];
        let tempTiming = [];
        let tempBookingTiming = [];
        let teacherSchedule = [];
        let bookingSchedule = [];

        studentList.forEach(oneStudent => {
            oneStudent.bookingDay
            if(oneStudent.bookingDay.toLowerCase() === selectedDay.toLowerCase()){
                    tempBookingTiming.push(this.calculateTimeArray(
                        {"hr":new Date(oneStudent.starttime).getHours(),"min":new Date(oneStudent.starttime).getMinutes()},
                        {"hr":new Date(oneStudent.endtime).getHours(),"min":new Date(oneStudent.endtime).getMinutes()}
                        ));
                    console.log("tempBookingTiming:", tempBookingTiming)
                    tempBookingTiming.forEach(element =>{
                        element.forEach(el => {
                            // console.log("ele",el)
                            bookingSchedule.push(el);
                            bookingSchedule = _.sortedUniq(bookingSchedule)
                        })
                    })
                } //end of if
        });

        teachersScheduledArray.forEach(oneTeacher => {
            oneTeacher.classes.forEach(classes => {
                // console.log("classes", classes)
                if(classes.day.toLowerCase() === selectedDay.toLowerCase()){
                    console.log("classes.startTime, classes.endTime:",classes.startTime, classes.endTime);
                    tempTiming.push(this.calculateTimeArray(classes.startTime, classes.endTime));
                    console.log("tempTiming:", tempTiming)
                    tempTiming.forEach(element =>{
                        element.forEach(el => {
                            // console.log("ele",el)
                            teacherSchedule.push(el);
                            teacherSchedule = _.sortedUniq(teacherSchedule)
                            // console.log("teacherSchedule:::::::::", teacherSchedule);
                        })
                    })
                } //end of if
            });
        });


        for( let i = 0; i < timings.length; i++){
            if (timings[i].day.toLowerCase() === selectedDay.toLowerCase()) {
                timeArray = this.calculateTimeArray(timings[i].mstartTime, timings[i].mendTime);
                etimeArray = this.calculateTimeArray(timings[i].estartTime, timings[i].eendTime);
            }
        }

        const scheduleArray = [...timeArray, ...etimeArray];

        const tempArr = _.difference(scheduleArray, teacherSchedule);
        const finalArr = _.difference(tempArr,bookingSchedule);
        // console.log("finalArr:", finalArr);

        return finalArr;
    }

    // getTeacherDetailsArray() {
    //     return this.teacherScheduledArray;
    // }
    saveDataToFirebase() {
        //   for(let i = 0; i < this.dailytimes.length; i++){
            // this.angularFirestore.collection('dailytimingsnew').add(this.dailytimes);
        //   }
    }

    getTeachersFromFirebase() {
        return this.angularFirestore.collection('teachers').snapshotChanges();
    }
k
    getDailyTimings() {
        return this.angularFirestore.collection('dailytimings').snapshotChanges();
    }
}
