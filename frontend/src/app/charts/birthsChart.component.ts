import { Input, ViewChild, OnInit, Component } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import 'rxjs/add/operator/map';

import { GraphData } from '../graphdata';
import { GraphService } from '../graphdata.service';


@Component({
  selector: 'app-births-chart',
  templateUrl: './birthsChart.component.html',
  styleUrls: ['./barChart.component.scss']
})

export class BirthsChartComponent implements OnInit {

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
  public genderText: string = "both";
  public graphType: number = 1;
  public graphText: string = "births-all";
  public graphTextShow: string = "All Births (Number)";
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
  public barChartLabels: string[] = [
      "1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998",
      "1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012",
      "2013","2014","2015","2016"
  ];
  public barChartData: any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], labels: this.barChartLabels }
  ];

  constructor(private graphService: GraphService) { }

  //  Initializes color array 
  ngOnInit() {
    this.updateColorArray("#fc9272"); // Pink
  }

  //  Changes Graph Data and updates chart
  public GraphTypeButton(): void {
    switch (this.graphType) {
        case 1: {
            this.graphType = 2;
            this.graphText = "first-births";
            this.graphTextShow = "First Births (Number)";
            break;
        }

        case 2: {
            this.graphType = 3;
            this.graphText = "births-wm";
            this.graphTextShow = "Births within Marriage (Number)";
            break;
        }

        case 3: {
            this.graphType = 4;
            this.graphText = "births-om";
            this.graphTextShow = "Births outside Marriage (Number)";
            break;
        }

        case 4: {
            this.graphType = 5;
            this.graphText = "mother-average-age";
            this.graphTextShow = "Average Age of Mother (Years)";
            break;
        }

        case 5: {
            this.graphType = 6;
            this.graphText = "ft-mother-average-age";
            this.graphTextShow = "Average Age of First Time Mother (Years)";
            break;
        }
        
        case 6: {
            this.graphType = 1;
            this.graphText = "births-all";
            this.graphTextShow = "All Births (Number)";
            break;
        }
    }

    this.LoadChart();
  }

  //  Reloads chart with current "region" and "gender" 
  //  for population data
  public LoadChart(): void {
    this.graphService
    .getBirths(this.regionc, this.graphText)
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
    error => console.log("Could not load birth chart data: " + this.regionc + " --- " + this.graphText));
  }

  //  Updates bar chart color array to new color
  public updateColorArray(colorValue: string): void {
    let i = 0;
    for (i = 0; i < 32; i++) {
      this.barChartColors[i] = colorValue;
    }
  }
}


