import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BookslotService } from '../bookslot.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private bookslotService: BookslotService,
                private firestore: AngularFirestore,
                private dialog: MatDialogRef<EditComponent>
                ) {
    }

    password = "";
    adminData;
    studentData;
    isCorrectPassword = false;

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
    onPasswordCheck(studentData){
        if (this.password === this.adminData[0].password) {
            this.isCorrectPassword = true;
            // this.dialog.close();
        }else{
            this.isCorrectPassword = false;
            console.log('wrong password bhai')
        }
        this.studentData = studentData;
    }

}
