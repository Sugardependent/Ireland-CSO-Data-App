import { Input, ViewChild, OnInit, Component } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import 'rxjs/add/operator/map';

import { GraphData } from './graphdata';
import { GraphService } from './graphdata.service';


@Component({
  selector: 'app-pop-chart',
  templateUrl: './popChart.component.html',
  styleUrls: ['./popChart.component.scss']
})

export class PopChartComponent implements OnInit {

  //@Input() regionc: string;

  regionc: string;

  @Input()
  set region(region: string) {
    this.regionc = region;
    this.LoadChart();
  }
  get region(): string { return this.regionc; }
  

  @ViewChild(BaseChartDirective) 
  public _chart: BaseChartDirective;


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
  public barChartLabels: string[] = ["1841","1851","1861","1871","1881","1891","1901","1911",
                                     "1926","1936","1946","1951","1956","1961","1966","1971",
                                     "1979","1981","1986","1991","1996","2002","2006","2011"];
  public barChartColors: string[] = [];
  public barChartColorSettings: Array<any> = [
    { 
      backgroundColor: this.barChartColors
    }
  ]
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public gender: number = 1;
  public genderText: string = "both";
  public points: any[] = [];
  public xvalues: number[] = [];
  public yvalues: number[] = [];
  public genderTextShow: string = "Total";
  public barChartData: any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], labels: this.barChartLabels, backgroundColor: this.barChartColors }
  ];

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    //console.log(this.region);
    this.updateColorArray("#77dd77");
    this.LoadChart();
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
      this.genderText = "male";
      this.genderTextShow = "Male";
      this.updateColorArray("#779ecb"); //Pastel Blue
    } else if (this.gender == 2) {
      this.gender = 3;
      this.genderText = "female";
      this.genderTextShow = "Female";
      this.updateColorArray("#ffd1dc"); //Pastel Pink
    } else if (this.gender == 3) {
      this.gender = 1;
      this.genderText = "both";
      this.genderTextShow = "Total";
      this.updateColorArray("#77dd77"); //Pastel Green
    }
    this.LoadChart();
  }

  public LoadChart(): void {
    this.graphService
    .get(this.regionc, 'population', this.genderText)
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
        { labels: this.barChartLabels, backgroundColor: this.barChartColors, data: this.yvalues }
      ];
      this._chart.chart.update();
    }, 
    error => console.log("Could not load chart data"));
  }

  public updateColorArray(colorValue: string): void {
    let i = 0;
    for (i = 0; i < 24; i++) {
      this.barChartColors[i] = colorValue;
    }
  }
}


