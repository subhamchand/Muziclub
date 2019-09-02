import { DateService } from './../date.service';
import { BookslotService } from './../bookslot.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-time',
  templateUrl: './class-time.component.html',
  styleUrls: ['./class-time.component.css']
})
export class ClassTimeComponent implements OnInit {

  teachersArray = [];
  modifiedArr = [];

  constructor(private bookService: BookslotService,
    private dateService: DateService) { }

  ngOnInit() {
    this.getTeachersArrayFromFB();
  }

  // create an array for displaying data
  createScheduleArray(teachersArray) {
    if (teachersArray.length > 0 ) {
      for (let i = 0; i < teachersArray.length; i++) {
        for (let j = 0; j < teachersArray[i].classes.length; j++) {
          teachersArray[i].classes[j]['name'] = this.teachersArray[i].name;
          this.modifiedArr.push(this.teachersArray[i].classes[j]);
        }
      }
    }
    // console.log(this.modifiedArr);
  }

  changeTimeFormat(object) {
    let sTime;
    let eTime;
    if(object.startTime.min == 0){
        object.startTime.min = "00";
    }
    if(object.endTime.min == 0){
        object.endTime.min = "00";
    }
    if (object.startTime.hr > 12) {
      sTime = (object.startTime.hr - 12) + ':' + object.startTime.min + ' PM';
      eTime = (object.endTime.hr - 12) + ':' + object.endTime.min + ' PM';
    } else if (object.startTime.hr < 12 && object.endTime.hr > 12){
      sTime = object.startTime.hr + ':' + object.startTime.min + ' AM';
      eTime = (object.endTime.hr - 12) + ':' + object.endTime.min + ' PM';
    } else {
      sTime = object.startTime.hr + ':' + object.startTime.min + ' AM';
      eTime = object.endTime.hr + ':' + object.endTime.min + ' AM';
    }
    return sTime + '  to  ' + eTime;
  }

  getTeachersArrayFromFB() {
    this.dateService.getTeachersFromFirebase().subscribe(res => {
      this.teachersArray = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
      });
      this.createScheduleArray(this.teachersArray);
    });
    // console.log(this.teachersArray);
  }
}
