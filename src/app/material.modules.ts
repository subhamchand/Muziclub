import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
   MatDatepickerModule, MatNativeDateModule
  } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule
  ],
})
export class MyOwnCustomMaterialModule { }
