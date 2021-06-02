import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  // },
  // {
  //   path: 'clients',
  //   loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
