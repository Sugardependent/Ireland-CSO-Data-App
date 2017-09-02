import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import { ChartsComponent} from './charts.component';
import { BarChartComponent} from './barChart.component';
import { DynLineChartComponent } from './dynLineChart.component';
import { GraphService } from './graphdata.service';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    BarChartComponent,
    DynLineChartComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
  ],
  providers: [GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
