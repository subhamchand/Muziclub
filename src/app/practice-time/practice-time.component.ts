import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-practice-time',
  templateUrl: './practice-time.component.html',
  styleUrls: ['./practice-time.component.css']
})
export class PracticeTimeComponent implements OnInit {

  constructor(private dialogservice: DialogService) { }

  ngOnInit() {
  }

  bookslot() {
     this.dialogservice.openAddDialog().subscribe( res =>{
       console.log(res);
     }) ;
  }

}
