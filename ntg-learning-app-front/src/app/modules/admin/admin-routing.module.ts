import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ViewAndManageTopicsComponent } from './components/view-and-manage-topics/view-and-manage-topics.component';

const routes: Routes = [
  {path: 'dashboard', component: AdminDashboardComponent}, 
  {path: 'view-topics', component: ViewAndManageTopicsComponent} , 
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
