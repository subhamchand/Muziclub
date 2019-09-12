import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './routing.modules';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarConfig } from '@angular/material';


import { MyOwnCustomMaterialModule } from './material.modules';
import { DetailsComponent } from './details/details.component';
import { HeaderComponent } from './header/header.component';
import { ClassTimeComponent } from './class-time/class-time.component';
import { PracticeTimeComponent } from './practice-time/practice-time.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { OpenTimingComponent } from './open-timing/open-timing.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DeleteOneComponent } from './delete-one/delete-one.component';
import { EditComponent } from './edit/edit.component';


export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    HeaderComponent,
    ClassTimeComponent,
    PracticeTimeComponent,
    AddComponent,
    DeleteComponent,
    OpenTimingComponent,
    ContactUsComponent,
    DeleteOneComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MyOwnCustomMaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [MatSnackBarConfig],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent, DeleteComponent, DeleteOneComponent, EditComponent]
})
export class AppModule { }
