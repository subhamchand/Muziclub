import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DateService } from './../date.service';
import { Component, OnInit, Inject } from '@angular/core';
import { BookslotService } from '../bookslot.service';
import * as  moment from 'moment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    isCorrectPassword= false;
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
    isSelectedDate = false;
    timeArray = [];
    dailyTimingArray = [];
    endDuration;
    bookingDay;
    selectedDay;
    teacherScheduledArray = [];
    studentList = [];
    studentData;
    password = "";
    adminData;
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private bookSlotService: BookslotService,
        private dateService: DateService,
        private dialog: MatDialogRef<EditComponent>,
        private bookslotService: BookslotService,
    ) {}

    ngOnInit() {
        this.getDailyTimingsFromFB();
        this.getTeachersArrayFromFB();
        this.getBookingDetials();
    }
    onSelectStartTime(event) {
        this.studentData.starttime = moment(this.bookingDay).format('l') + ' ' + event.value;
        console.log("on select start time", this.studentData.starttime);
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
        // const startD = moment(this.studentData.bookingdate).format('l');
        this.formValidate();
        if (this.studentData.bookingdate !== '') {
            this.isSelectedDate = true;
        }
    }

    formValidate() {
        if (this.studentData.name !== '' && this.studentData.contact !== '') {
            return false;
        } else {
            return true;
        }
    }

    bookASlot() {
        if (!this.formValidate()) {
            const dateFormat = new Date(this.studentData.starttime);
            console.log("date format", dateFormat);
            console.log("dateFormat.getMinutes():", dateFormat.getMinutes());
            const newDate = moment(dateFormat).add(this.endDuration, 'minutes');
            this.studentData.endtime = this.dateConverter(newDate);
            const tempDate = new Date(this.bookingDay);
            const momentEDate = moment(tempDate).format('dddd , MMM Do');
            this.studentData.bookingdate = momentEDate;
            this.studentData.bookingDay = this.selectedDay;
            console.log(this.studentData);
            this.bookSlotService.onSaveStudentBooking(this.studentData).then(res => {
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

    getAdminDataFromService(){
        this.bookslotService.getAdminData().subscribe(res => {
            this.adminData = res.map(item => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                };
            });
        }, error => {
            console.log("error in getting data: ", error);
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
  onEditOne(studentObj){
      this.studentData = this.studentData;
      console.log(this.studentData);
      if (this.password === this.adminData[0].password) {
          this.isCorrectPassword = true;

        }else{
            this.isCorrectPassword = false;
            console.log('wrong password bhai')
        }
  }

}
