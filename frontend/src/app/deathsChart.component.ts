import { Input, ViewChild, OnInit, Component } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import 'rxjs/add/operator/map';

import { GraphData } from './graphdata';
import { GraphService } from './graphdata.service';


@Component({
  selector: 'app-deaths-chart',
  templateUrl: './deathsChart.component.html',
  styleUrls: ['./barChart.component.scss']
})

export class DeathsChartComponent implements OnInit {

  //  "Region" parameter is retrieved from url parameter 
  //  in "charts" component
  regionc: string;

  @Input()
  set region(region: string) {
    this.regionc = region;
    this.LoadChart();
  }
  get region(): string { return this.regionc; }
  
  @ViewChild(BaseChartDirective) 
  public _chart: BaseChartDirective;

  //  Bar Chart Settings and Vars
  public barChartColors: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public gender: number = 1;
  public genderText: string = "female";
  public genderTextShow: string = "Total";
  public points: any[] = [];
  public xvalues: number[] = [];
  public yvalues: number[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
          ticks: {
            beginAtZero: true
    }}]}
  };
  public barChartColorSettings: Array<any> = [
    { 
      backgroundColor: this.barChartColors
    }
  ]
  public barChartLabels: string[] = ["1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",
                                     "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
                                     "2011", "2012", "2013", "2014", "2015", "2016"];
  public barChartData: any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], labels: this.barChartLabels }
  ];

  constructor(private graphService: GraphService) { }

  //  Initializes color array 
  ngOnInit() {
    this.updateColorArray("#77dd77");
  }

  //  Reloads chart with current "region" and "gender" 
  //  for population data
  public LoadChart(): void {
    this.graphService
    .get(this.regionc, 'deaths', this.genderText)
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
        { labels: this.barChartLabels, data: this.yvalues }
      ];
      this._chart.chart.update();
    }, 
    error => console.log("Could not load chart data"));
  }

  //  Updates bar chart color array to new color
  public updateColorArray(colorValue: string): void {
    let i = 0;
    for (i = 0; i < 28; i++) {
      this.barChartColors[i] = colorValue;
    }
  }
}


