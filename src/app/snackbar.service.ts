import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackbar: MatSnackBar, private matconfig: MatSnackBarConfig) { }

  showSnackBar(msg, action){
      this.matSnackbar.open(msg, action , {duration: 3000, verticalPosition: 'top', horizontalPosition: 'right'} );
    //   this.matconfig.duration = 2000;
  }
}
