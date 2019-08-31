import { DateService } from './../date.service';
import { BookslotService } from './../bookslot.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-time',
  templateUrl: './class-time.component.html',
  styleUrls: ['./class-time.component.css']
})
export class ClassTimeComponent implements OnInit {

  list = [];
  teachersArray = [];
  modifiedArr = [];

  constructor(private bookService: BookslotService,
    private dateService: DateService) { }

  ngOnInit() {
    // this.dateService.saveDateToFirebase();
    this.dateService.saveDateToFirebase();
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

  changeTimeFormat(teacher) {
    let sTime;
    let eTime;
    if (teacher.startTime.hr > 12) {
      sTime = (teacher.startTime.hr - 12) + ':' + teacher.startTime.min + ' pm';
      eTime = (teacher.endTime.hr - 12) + ':' + teacher.endTime.min + ' pm';
    } else if (teacher.startTime.hr < 12 && teacher.endTime.hr > 12){
      sTime = teacher.startTime.hr + ':' + teacher.startTime.min + ' am';
      eTime = (teacher.endTime.hr - 12) + ':' + teacher.endTime.min + ' pm';
    } else {
      sTime = teacher.startTime.hr + ':' + teacher.startTime.min + ' am';
      eTime = teacher.endTime.hr + ':' + teacher.endTime.min + ' am';
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
