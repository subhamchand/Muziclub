import { MatDialogRef } from '@angular/material';
import { DateService } from './../date.service';
import { Component, OnInit } from '@angular/core';
import { BookslotService } from '../bookslot.service';
import * as  moment from 'moment';



const regExp = /^[1-9]{1}[0-9]{9}$/;

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
    mindate = new Date();
    maxdate = moment(new Date()).add(10, 'days').format();
    startArraytimes = [];
    endArraytimes = [
        {
            title: '30 MIN', value: '30'
        },
        {
            title: '1 HOUR', value: '60'
        }
    ];
    isValidTime = false;
    isSelectedDate = false;
    timeArray = [];
    dailyTimingArray = [];
    endDuration;
    bookingDay;
    selectedDay;
    teacherScheduledArray = [];
    studentList = [];
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    user = {
        name: '',
        contact: '',
        bookingdate: null,
        bookingDay: '',
        starttime: '',
        endtime: null,
        comment: ''
    };

    constructor(private bookSlotService: BookslotService,
        private dateService: DateService,
        private dialog: MatDialogRef<AddComponent>,
        private bookslotService: BookslotService,
    ) {
    }

    ngOnInit() {
        this.getDailyTimingsFromFB();
        this.getTeachersArrayFromFB();
        this.getBookingDetials();
    }
    onSelectStartTime(event) {
        this.user.starttime = moment(this.bookingDay).format('l') + ' ' + event.value;
        console.log("on select start time", this.user.starttime);
        this.formValidate();
    }

    onSelectEndTime(event) {
        this.endDuration = event.value;
        this.formValidate();
    }

    onDateSelect(event) {
        this.bookingDay = event.value;
        this.selectedDay = this.days[this.bookingDay.getDay()];
        console.log("date and dayy ", this.bookingDay, this.selectedDay)
        this.timeArray = this.dateService.dateArray(this.dailyTimingArray, this.selectedDay,
        this.teacherScheduledArray, this.studentList);
        // const startD = moment(this.user.bookingdate).format('l');
        this.formValidate();
        if (this.user.bookingdate !== '') {
            this.isSelectedDate = true;
        }
    }

    formValidate() {
        if (this.user.name !== '' && this.user.contact !== '') {
            return false;
        } else {
            return true;
        }
    }

    bookASlot() {
        if (!this.formValidate()) {
            const dateFormat = new Date(this.user.starttime);
            console.log("date format", dateFormat);
            console.log("dateFormat.getMinutes():", dateFormat.getMinutes());
            const newDate = moment(dateFormat).add(this.endDuration, 'minutes');
            this.user.endtime = this.dateConverter(newDate);
            const tempDate = new Date(this.bookingDay);
            const momentEDate = moment(tempDate).format('dddd , MMM Do');
            this.user.bookingdate = momentEDate;
            this.user.bookingDay = this.selectedDay;
            console.log(this.user);
            this.bookSlotService.onSaveStudentBooking(this.user).then(res => {
                console.log(res);
                this.dialog.close(res);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    dateConverter(date) {
        const endDate = new Date(date);
        const momentEDate = moment(this.bookingDay).format('l') + ' ' + moment(endDate).format('LT');
        console.log("momentEDate:", momentEDate)
        return momentEDate;
    }

    getDailyTimingsFromFB() {
        this.dateService.getDailyTimings().subscribe(res => {
            this.dailyTimingArray = res.map(item => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                };
            });
        });

    }

    getTeachersArrayFromFB() {
        this.dateService.getTeachersFromFirebase().subscribe(res => {
            this.teacherScheduledArray = res.map(item => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                };
            });
            console.log("add component", this.teacherScheduledArray);
        });
    }

    getBookingDetials() {
        this.bookslotService.getStudentBooking().subscribe(res => {
            this.studentList = res.map(item => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                };
            });
        }, error => {
            console.log(error);
        });
    }
}
