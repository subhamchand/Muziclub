import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
   MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule
  } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule
  ],
})
export class MyOwnCustomMaterialModule { }
