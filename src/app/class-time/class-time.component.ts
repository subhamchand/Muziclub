import { BookslotService } from './../bookslot.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-time',
  templateUrl: './class-time.component.html',
  styleUrls: ['./class-time.component.css']
})
export class ClassTimeComponent implements OnInit {

  list = [];

  constructor(private bookService: BookslotService) { }

  ngOnInit() {
    // this.bookService.onSave();
    // this.bookService.onSave().subscribe( res => {
    //   this.list = res.map(item => {
    //     return {
    //       id: item.payload.doc.id,
    //       ...item.payload.doc.data()
    //     };
    //   });
    // });
    console.log('called class time');
  }

}
