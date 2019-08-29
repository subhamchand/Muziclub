import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
   MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule
  } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule
  ],
})
export class MyOwnCustomMaterialModule { }
