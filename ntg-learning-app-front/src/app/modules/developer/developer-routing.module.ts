import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperDashboardComponent } from './component/developer-dashboard/developer-dashboard.component';
import { ProgressStatsComponent } from './component/progress-stats/progress-stats.component';
import { DeveloperGuard } from '../../guards/developer.guard';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DeveloperDashboardComponent, canActivate: [DeveloperGuard]},
  {path: 'progress', component: ProgressStatsComponent, canActivate: [DeveloperGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule { }

