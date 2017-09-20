import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { ChartsComponent }   from './charts.component';
import { HomeComponent }     from './home.component';

const routes: Routes = [
  { path: 'charts/:regionname', component: ChartsComponent },
  { path: '', component: HomeComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}