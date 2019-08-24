import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatDialogModule],
})
export class MyOwnCustomMaterialModule { }
