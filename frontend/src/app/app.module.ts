import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import { ChartsComponent} from './charts.component';
//import { BarChartComponent} from './barChart.component';
import { DynLineChartComponent } from './dynLineChart.component';
import { GraphService } from './graphdata.service';
import { PopChartComponent } from './popChart.component';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    //BarChartComponent,
    DynLineChartComponent,
    PopChartComponent,
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

