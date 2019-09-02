import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'details', component: DetailsComponent},
    {path: 'contactus', component: ContactUsComponent }
];
