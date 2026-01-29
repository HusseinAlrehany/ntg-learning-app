import { Routes } from '@angular/router';
import { LandingPageComponent } from './shared-component/landing-page/landing-page.component';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},

    {
        path: 'authenticated',
        component: AuthenticatedLayoutComponent,
        children: [
            {path: 'admin', loadChildren: ()=> import("./modules/admin/admin.module")
                .then(e=> e.AdminModule)},
            {path: 'developer', loadChildren: ()=> import("./modules/developer/developer.module")
                .then(e=> e.DeveloperModule)}
        ]
    },
    
    // Redirect old routes to new authenticated routes
    {path: 'admin', redirectTo: 'authenticated/admin', pathMatch: 'full'},
    {path: 'developer', redirectTo: 'authenticated/developer', pathMatch: 'full'}
];
