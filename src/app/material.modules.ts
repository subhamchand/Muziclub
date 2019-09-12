import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
   MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule, MatIconModule, MatSnackBarModule
  } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule, MatIconModule, MatSnackBarModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule, MatIconModule, MatSnackBarModule
  ],
})
export class MyOwnCustomMaterialModule { }
