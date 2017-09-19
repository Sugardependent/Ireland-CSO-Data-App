/*
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

  @ViewChild(BaseChartDirective) 
  public _chart: BaseChartDirective;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ["1841","1851","1861","1871","1881","1891","1901","1911",
                                     "1926","1936","1946","1951","1956","1961","1966","1971",
                                     "1979","1981","1986","1991","1996","2002","2006","2011"];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public gender: number = 1;
  public genderText: string = "Both";
  public points: any[] = [];
  public xvalues: number[] = [];
  public yvalues: number[] = [];
  public barChartData: any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Population' }
  ];

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    let graph = this.graphService
      .get(526)
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
        this._chart.chart.update();
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
      this.genderText = "Male";
      k = 556;
    } else if (this.gender == 2) {
      this.gender = 3;
      this.genderText = "Female";
      k = 586;
    } else if (this.gender == 3) {
      this.gender = 1;
      this.genderText = "All";
      k = 526;
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
      this._chart.chart.update();
    })
  }
}
*/