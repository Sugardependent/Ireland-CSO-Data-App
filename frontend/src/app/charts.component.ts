import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent {
  regiont: string = "state";
  nonGardaRegion: boolean = true;
  deathsTrig: boolean = false;
  birthsTrig: boolean = false;

  dub1: string = "Dublin City";
  dub2: string = "Fingal";
  dub3: string = "Dun Laoghaire Rathdown";
  dub4: string = "South Dublin";
  cork1: string = "Cork City";
  cork2: string = "Cork County";
  lmk1: string = "Limerick City";
  lmk2: string = "Limerick County";
  tip1: string = "North Tipperary";
  tip2: string = "South Tipperary";
  wfd1: string = "Waterford City";
  wfd2: string = "Waterford County";
  gwy1: string = "Galway City";
  gwy2: string = "Galway County";

  dubTrig: boolean = false;
  corkTrig: boolean = false;
  lmkTrig: boolean = false;
  tipTrig: boolean = false;
  wfdTrig: boolean = false;
  gwyTrig: boolean = false;
  
  //  Subscribes to url changes to catch changes 
  //  "region" parameter and update accordingly
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) 
  {
    location.subscribe(x => {
      this.getRegion()
    })
  }

  ngOnInit(): void {
    this.getRegion();
  }

  //  Retrieves "region" url parameter
  public getRegion(): void {
    this.route.params.subscribe(params => {
      this.dubTrig = false;
      this.corkTrig = false;
      this.lmkTrig = false;
      this.tipTrig = false;
      this.wfdTrig = false;
      this.gwyTrig = false;
      this.birthsTrig = false;
      this.deathsTrig = false;

      let regiontemp = params['regionname'];
      if (regiontemp.indexOf("garda") !== -1) {
        this.nonGardaRegion = false;
        this.regiont = regiontemp.replace("-", " ");
      } else {
        this.nonGardaRegion = true;
        if (regiontemp == "state") {
          this.deathsTrig = true;
        } 

        switch (regiontemp) {
          case "dublin": {
            this.dubTrig = true;
            break;
          }
        
          case "cork": {
            this.corkTrig = true;
            break;
          }
          case "limerick": {
            this.lmkTrig = true;
            break;
          }
          case "tipperary": {
            this.tipTrig = true;
            break;
          }
          case "waterford": {
            this.wfdTrig = true;
            break;
          }
          case "galway": {
            this.gwyTrig = true;
            break;
          }
          default: {
            this.birthsTrig = true;
            break;
          }
        }

      this.regiont = regiontemp;
      }
    });
  }

}
