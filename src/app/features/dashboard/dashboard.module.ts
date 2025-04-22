import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CardComponent } from '../../shared/ui/card/card.component';
import { DashboardService } from './services/dashboard.service';

const routes = [
  {
    path: '',
    component: DashboardPageComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    DashboardPageComponent
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { } 