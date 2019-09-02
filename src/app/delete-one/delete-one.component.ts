import { Component, OnInit, Inject } from '@angular/core';
import { BookslotService } from '../bookslot.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-delete-one',
    templateUrl: './delete-one.component.html',
    styleUrls: ['./delete-one.component.css']
})
export class DeleteOneComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private bookslotService: BookslotService,
                private firestore: AngularFirestore,
                private dialog: MatDialogRef<DeleteOneComponent>
                ) {
    }
    password = "";
    adminData;

    ngOnInit() {
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

    onDeleteOne(sId) {
        if (this.password === this.adminData[0].password) {
            this.firestore.doc('students/' + sId).delete();
            this.dialog.close();
            console.log('deleted bhai')
        }else{
            console.log('wrong password bhai')
        }
    }
}
