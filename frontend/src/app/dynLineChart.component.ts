import { Component } from '@angular/core';

@Component({
  selector: 'app-dyn-line-chart',
  templateUrl: './dynLineChart.component.html',
  styleUrls: ['./dynLineChart.component.scss']
})
export class DynLineChartComponent {
  // lineChart
 public lineChartData: Array<any> = [
   [65, 59, 80, 81, 56, 55, 40],
   [28, 48, 40, 19, 86, 27, 90]
 ];
 public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
 public lineChartType: string = 'line';


 public randomizeType(): void {
   this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
 }
 public chartClicked(e: any): void {
   console.log(e);
 }
 public chartHovered(e: any): void {
   console.log(e);
 }
}
