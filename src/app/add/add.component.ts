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
  startArraytimes = [];
  endArraytimes = [];
  isValidTime = false;
  isSelectedDate = false;

  user = {
    name: '',
    contact: null,
    bookingdate: null,
    starttime: '',
    endtime: ''
  };

  constructor(private bookSlotService: BookslotService) {
  }

  ngOnInit() {
    this.startArraytimes = this.bookSlotService.getStartTimesArray('monday')[0].times;
    this.endArraytimes = this.bookSlotService.getEndTimesArray('monday')[0].times;
  }
  onSelectStartTime(event) {
    this.user.starttime = moment(this.user.bookingdate).format('l') + ' ' + event.value;
    this.formValidate();

  }

  onSelectEndTime(event) {
    this.user.endtime = moment(this.user.bookingdate).format('l') + ' ' + event.value;
    this.formValidate();


  }

  onDateSelect(event) {
    this.user.bookingdate = event.value;
    const startD = moment(this.user.bookingdate).format('l');
    this.formValidate();
    if (this.user.bookingdate !== '') {
      this.isSelectedDate = true;
    }
  }

  formValidate() {
    const date1 = new Date(this.user.endtime);
    const date2 = new Date(this.user.starttime);
    const diff = (date1.getTime() - date2.getTime()) / 3600000;
    if (diff > 0 && diff <= 1) {
      this.isValidTime = true;
    } else {
      this.isValidTime = false;
    }

    if (this.user.name !== '' && this.user.contact !== null
      && regExp.test(this.user.contact) && diff > 0 && diff <= 1) {
      return false;
    } else {
      return true;
    }
  }

}
