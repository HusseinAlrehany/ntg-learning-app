import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ViewAndManageTopicsComponent } from './components/view-and-manage-topics/view-and-manage-topics.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]}, 
  {path: 'view-topics', component: ViewAndManageTopicsComponent, canActivate: [AdminGuard]} , 
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
