import { Input, ViewChild, OnInit, Component } from "@angular/core";

import { BaseChartDirective } from "ng2-charts/ng2-charts";

import "rxjs/add/operator/map";

import { GraphData } from "../graphdata";
import { GraphService } from "../graphdata.service";

@Component({
  selector: "app-crime-chart",
  templateUrl: "./crimeChart.component.html",
  styleUrls: ["./barChart.component.scss"]
})
export class CrimeChartComponent implements OnInit {
  //  "Region" parameter is retrieved from url parameter
  //  in "charts" component
  regionc: string;
  @Input() crimetype: string = "999";

  @Input()
  set region(region: string) {
    this.regionc = region;
    this.LoadChart();
  }
  get region(): string {
    return this.regionc;
  }

  @ViewChild(BaseChartDirective) public _chart: BaseChartDirective;

  //  Bar Chart Settings and Vars
  public barChartColors: string[] = [];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;
  public genderText: string = "both";
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
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartColorSettings: Array<any> = [
    {
      backgroundColor: this.barChartColors
    }
  ];
  public barChartLabels: string[] = [
    "2003Q1", "2003Q2", "2003Q3", "2003Q4", "2004Q1", "2004Q2", "2004Q3", "2004Q4", "2005Q1", "2005Q2", "2005Q3", "2005Q4", "2006Q1", 
    "2006Q2", "2006Q3", "2006Q4", "2007Q1", "2007Q2", "2007Q3", "2007Q4", "2008Q1", "2008Q2", "2008Q3", "2008Q4", "2009Q1", "2009Q2", 
    "2009Q3", "2009Q4", "2010Q1", "2010Q2", "2010Q3", "2010Q4", "2011Q1", "2011Q2", "2011Q3", "2011Q4", "2012Q1", "2012Q2", "2012Q3", 
    "2012Q4", "2013Q1", "2013Q2", "2013Q3", "2013Q4", "2014Q1", "2014Q2", "2014Q3", "2014Q4", "2015Q1", "2015Q2", "2015Q3", "2015Q4", 
    "2016Q1", "2016Q2", "2016Q3", "2016Q4"
  ];

  public barChartData: any[] = [
    {
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      labels: this.barChartLabels
    }
  ];

  public strgraphs = {
    "01": "01 - Homicide offences",
    "0111": "0111 - Murder",
    "0112": "0112 - Manslaughter",
    "0113": "0113 - Infanticide",
    "012": "012 - Dangerous driving leading to death",
    "02": "02 - Sexual offences",
    "021": "021 - Rape and sexual assault",
    "022": "022 - Other sexual offences",
    "03":
      "03 - Attempts/threats to murder, assaults, harassments and related offences",
    "0311": "0311 - Murder-attempt",
    "0312": "0312 - Murder-threat",
    "033": "033 - Harassment and related offences",
    "034": "034 - Assault causing harm, poisoning",
    "035": "035 - Other assault",
    "04": "04 - Dangerous or negligent acts",
    "0411": "0411 - Dangerous driving causing serious bodily harm",
    "0412":
      "0412 - Driving/in charge of a vehicle while over legal alcohol limit",
    "0413": "0413 - Driving/in charge of a vehicle under the influence of drugs",
    "0421": "0421 - Endangerment with potential for serious harm/death",
    "0422": "0422 - Abandoning a child, child neglect and cruelty",
    "0423": "0423 - Unseaworthy/dangerous use of boat or ship",
    "0424":
      "0424 - False alarm/interference with aircraft or air transport facilities",
    "0425": "0425 - Endangering traffic offences",
    "05": "05 - Kidnapping and related offences",
    "0511": "0511 - False imprisonment",
    "0512": "0512 - Abduction of person under 16 years of age",
    "0513": "0513 - Human trafficking offences",
    "06": "06 - Robbery, extortion and hijacking offences",
    "0611": "0611 - Robbery of an establishment or institution",
    "0612": "0612 - Robbery of cash or goods in transit",
    "0613": "0613 - Robbery from the person",
    "0621": "0621 - Blackmail or extortion",
    "0631": "0631 - Carjacking, hijacking/unlawful seizure of aircraft/vessel",
    "07": "07 - Burglary and related offences",
    "0711": "0711 - Aggravated burglary",
    "0712": "0712 - Burglary (not aggravated)",
    "0713":
      "0713 - Possession of an article (with intent to burgle, steal, demand)",
    "08": "08 - Theft and related offences",
    "081": "081 - Theft/taking of vehicle and related offences",
    "0821": "0821 - Theft from person",
    "0822": "0822 - Theft from shop",
    "084": "084 - Other thefts, handling stolen property",
    "09": "09 - Fraud, deception and related offences",
    "10": "10 - Controlled drug offences",
    "1011": "1011 - Importation of drugs",
    "1012": "1012 - Cultivation or manufacture of drugs",
    "1021": "1021 - Possession of drugs for sale or supply",
    "1022": "1022 - Possession of drugs for personal use",
    "103": "103 - Other drug offences",
    "11": "11 - Weapons and Explosives Offences",
    "111": "111 - Explosives, chemical weapons offences",
    "1121": "1121 - Discharging a firearm",
    "1122": "1122 - Possession of a firearm",
    "113": "113 - Offensive weapons offences (n.e.c.)",
    "114": "114 - Fireworks offences",
    "12": "12 - Damage to property and to the environment",
    "1211": "1211 - Arson",
    "1212": "1212 - Criminal damage (not arson)",
    "1221": "1221 - Litter offences",
    "13": "13 - Public order and other social code offences",
    "131": "131 - Disorderly conduct",
    "132": "132 - Trespass offences",
    "133": "133 - Liquor licensing offences",
    "134": "134 - Prostitution offences",
    "135": "135 - Regulated betting/money, collection/trading offences",
    "136": "136 - Social code offences (n.e.c.)",
    "15":
      "15 - Offences against government, justice procedures and organisation of crime",
    "151": "151 - Offences against government and its agents",
    "152": "152 - Organisation of crime and conspiracy to commit crime",
    "153": "153 - Perverting the course of justice",
    "157": "157 - Offences while in custody, breach of court orders"
  };

  strgraphkeys: string[] = [
    "01", "0111", "0112", "0113", "012", "02", "021", "022", "03", "0311", "0312", "033", "034", "035", "04", "0411", "0412", 
    "0413", "0421", "0422", "0423", "0424", "0425", "05", "0511", "0512", "0513", "06", "0611", "0612", "0613", "0621", "0631", 
    "07", "0711", "0712", "0713", "08", "081", "0821", "0822", "084", "09", "10", "1011", "1012", "1021", "1022", "103", "11", 
    "111", "1121", "1122", "113", "114", "12", "1211", "1212", "1221", "13", "131", "132", "133", "134", "135", "136", "15", "151", "152", "153", "157"
  ];

  public minKey = 0;
  public maxKey = 55;

  public graphType: number = 1;
  public graphText: string = this.strgraphkeys[this.graphType];
  public graphTextShow: string = this.strgraphs[this.graphText];

  public loadingtrig: boolean = false;

  constructor(private graphService: GraphService) {}

  //  Initializes color array
  ngOnInit() {
    this.updateColorArray("#3182bd"); // Blue
    this.setGraphs();
  }

  // Sets which Graphs will be shown depending on crime graph
  // numbering system and attribute property setting "crimetype"
  public setGraphs(): void {
    let max = parseInt(this.crimetype) + 1;

    let strmax = max.toString();
    if (parseInt(this.crimetype) < 10) {
      this.crimetype = "0" + this.crimetype;
    }
    if (max < 10) {
      strmax = "0" + strmax;
    }

    this.minKey = this.strgraphkeys.indexOf(this.crimetype);
    if ( max >= 16 ) {
        this.maxKey = 71;
    } else {
        this.maxKey = this.strgraphkeys.indexOf(strmax);
    }
    this.graphType = this.minKey;
    this.graphText = this.strgraphkeys[this.graphType];
    this.graphTextShow = this.strgraphs[this.graphText];
  }

  //  Changes Graph and updates chart
  public GraphTypeButton(): void {
    if (this.graphType == (this.maxKey - 1)) {
      this.graphType = this.minKey;
    } else {

      console.log(this.graphType);
      this.graphType++;
    }

    this.graphText = this.strgraphkeys[this.graphType];
    this.graphTextShow = this.strgraphs[this.graphText];

    this.LoadChart();
  }

  //  Reloads chart with current Graph Data
  public LoadChart(): void {
    this.loadingtrig = true;
    this.graphService.getCrime(this.regionc, this.graphText).subscribe(
      graphdata => {
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
        this.loadingtrig = false;
        this._chart.chart.update();
      },
      error => console.log("Could not load crime chart data")
    );
  }

  //  Updates bar chart color array to new color
  public updateColorArray(colorValue: string): void {
    let i = 0;
    for (i = 0; i < 56; i++) {
      this.barChartColors[i] = colorValue;
    }
  }
}
