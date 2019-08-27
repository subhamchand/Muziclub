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
  maxdate = moment(new Date()).add(3, 'days').format();
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
  endDuration;
  bookingDay;

  user = {
    name: '',
    contact: '',
    bookingdate: null,
    starttime: '',
    endtime: null,
    comment: ''
  };

  constructor(private bookSlotService: BookslotService,
    private dateService: DateService,
    private dialog: MatDialogRef<AddComponent>) {
  }

  ngOnInit() {
    this.startArraytimes = this.bookSlotService.getStartTimesArray('monday')[0].times;
    this.timeArray = this.dateService.dateArray();
  }
  onSelectStartTime(event) {
    this.user.starttime = moment(new Date()).format('l') + ' ' + event.value;
    console.log(moment(new Date()).format('l') + ' ' + event.value);
    this.formValidate();

  }

  onSelectEndTime(event) {
    this.endDuration = event.value;
    this.formValidate();


  }

  onDateSelect(event) {
    this.bookingDay = event.value;
    const startD = moment(this.user.bookingdate).format('l');
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
      const newDate = dateFormat.setMinutes(dateFormat.getMinutes() + this.endDuration); // new date after adding 30 or 60 min
      this.user.endtime = this.dateConverter(newDate);
      this.user.bookingdate = this.dateConverter(this.bookingDay);
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
    const momentEDate = moment(new Date()).format('l') + ' ' + moment(date).format('LT');
    return momentEDate;
  }

}
