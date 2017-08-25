import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ChartsModule } from 'ng2-charts';
import { ChartsComponent} from './charts.component';
import { BarChartComponent} from './barChart.component';
import { DynLineChartComponent } from './dynLineChart.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    BarChartComponent,
    DynLineChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
