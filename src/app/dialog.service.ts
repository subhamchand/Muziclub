import { AddComponent } from './add/add.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

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
}
