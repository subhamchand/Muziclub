import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
   MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule, MatIconModule
  } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule, MatIconModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule, MatIconModule
  ],
})
export class MyOwnCustomMaterialModule { }
