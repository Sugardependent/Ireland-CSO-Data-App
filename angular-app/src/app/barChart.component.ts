import { ViewChild, OnInit, Component } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import 'rxjs/add/operator/map';

import { GraphData } from './graphdata';
import { GraphService } from './graphdata.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './barChart.component.html',
  styleUrls: ['./barChart.component.scss']
})


export class BarChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public gender: number = 1;
  public points: any[] = [];
  public xvalues: number[] = [];
  public yvalues: number[] = [];
  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    let graph = this.graphService
      .get(439)
      .subscribe(graphdata => {
        this.xvalues = [];
        this.yvalues = [];
        this.barChartLabels = [];
        this.barChartData = [];
        for (let x of graphdata.points) {
          this.xvalues.push(x.x_value);
          this.barChartLabels.push(String(x.x_value));
          this.yvalues.push(x.y_value);
        }
        this.barChartData = [
          { data: this.yvalues, label: 'Population' }
        ];
        this.chart.chart.update();
      })
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  public GenderButton(): void {
    let k = 0;
    if (this.gender == 1) {
      this.gender = 2;
      k = 440;
    } else if (this.gender == 2) {
      this.gender = 3;
      k = 441;
    } else if (this.gender == 3) {
      this.gender = 1;
      k = 439;
    }

    let graph = this.graphService
    .get(k)
    .subscribe(graphdata => {
      this.xvalues = [];
      this.yvalues = [];
      this.barChartLabels = [];
      this.barChartData = [];
      for (let x of graphdata.points) {
        this.xvalues.push(x.x_value);
        this.barChartLabels.push(String(x.x_value));
        this.yvalues.push(x.y_value);
      }
      this.barChartData = [
        { data: this.yvalues, label: 'Population' }
      ];
    })
  }
}
