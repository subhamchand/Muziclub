import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BookslotService } from '../bookslot.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
    password = "";
    deleteBookings = [];
    adminData;
    constructor(private firestore: AngularFirestore, private bookslotService: BookslotService) { }
    ngOnInit() {
        this.getBookingDetails();
        this.getAdminDataFromService();
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
    getBookingDetails() {
        this.bookslotService.getStudentBooking().subscribe(res => {
            this.deleteBookings = res.map(item => {
                return {
                    id: item.payload.doc.id,
                    ...item.payload.doc.data()
                };
            });
        }, error => {
            console.log("error in getting data: ", error);
        });
    }
    onDelete() {
        if (this.password === this.adminData[0].password) {
            const deleteBookings = this.deleteBookings;
            for (var booking of deleteBookings) {
                this.firestore.doc('students/' + booking.id).delete();
            }
            console.log('deleted bhai')
        }else{
            console.log('wrong password bhai')
        }
    }

}
