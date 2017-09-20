import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import { ChartsComponent} from './charts.component';
import { DynLineChartComponent } from './dynLineChart.component';
import { GraphService } from './graphdata.service';
import { PopChartComponent } from './popChart.component';
import { HomeComponent } from './home.component';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    DynLineChartComponent,
    PopChartComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }

