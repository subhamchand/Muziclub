import { AddComponent } from './add/add.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteComponent } from './delete/delete.component';
import { DeleteOneComponent } from './delete-one/delete-one.component';
import { EditComponent } from './edit/edit.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor( public dialog: MatDialog ) { }

  openAddDialog() {
    let dialogRef: MatDialogRef<AddComponent>;
    dialogRef = this.dialog.open(AddComponent);
    return dialogRef.afterClosed();
  }
  openDeleteDialog() {
    let dialogRef: MatDialogRef<DeleteComponent>;
    dialogRef = this.dialog.open(DeleteComponent);
    return dialogRef.afterClosed();
  }
  openDeleteOneDialog(studentId) {
    let dialogRef: MatDialogRef<DeleteOneComponent>;
    dialogRef = this.dialog.open(DeleteOneComponent, { data: { sId: studentId } });
    return dialogRef.afterClosed();
  }
  openEditOneDialog(studentObj) {
    //   console.log("studentObj",studentObj);
    let dialogRef: MatDialogRef<EditComponent>;
    dialogRef = this.dialog.open(EditComponent, { data: { student: studentObj } });
    return dialogRef.afterClosed();
  }
}
