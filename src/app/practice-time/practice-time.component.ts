import { BookslotService } from './../bookslot.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialog.service';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';
import { DateService } from '../date.service';


@Component({
    selector: 'app-practice-time',
    templateUrl: './practice-time.component.html',
    styleUrls: ['./practice-time.component.css']
})
export class PracticeTimeComponent implements OnInit {

    studentList = [];

    constructor(private dialogservice: DialogService,
        private bookslotService: BookslotService,
        private firestore: AngularFirestore,
        private dateService: DateService
    ) { }

    ngOnInit() {
        this.getBookingDetials();
    }
    
    bookslot() {
        this.dialogservice.openAddDialog().subscribe(res => {
            console.log(res);
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

    getDateFormat(sDate, eDate) {
        const sTime = new Date(sDate);
        const eTime = new Date(eDate);
        return moment(sTime).format('LT') + ' to ' + moment(eTime).format('LT');
    }

    openDeletePopup() {
        this.dialogservice.openDeleteDialog().subscribe();
    }
    
}
