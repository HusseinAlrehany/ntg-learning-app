import { Routes } from '@angular/router';
import { LandingPageComponent } from './shared-component/landing-page/landing-page.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},

    {path: 'admin', loadChildren: ()=> import("./modules/admin/admin.module")
        .then(e=> e.AdminModule)},
    {path: 'developer', loadChildren: ()=> import("./modules/developer/developer.module")
        .then(e=> e.DeveloperModule)}    
];
