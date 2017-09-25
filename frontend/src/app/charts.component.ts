import { Component, Input, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Location } from "@angular/common";

import "rxjs/add/operator/bufferTime";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"]
})
export class ChartsComponent {
  regiont: string = "state";

  // Triggers for different graph types
  nonGardaRegion: boolean = true;
  deathsTrig: boolean = false;
  birthsTrig: boolean = false;
  birthsCheckRegions: string[] = ["leinster", "ulster", "munster", "connacht"];

  // In cases of Birth Data, checks for special cases of:
  // Dublin, Cork, Limerick, Tipperary, Waterford, Galway
  dubTrig: boolean = false;
  corkTrig: boolean = false;
  lmkTrig: boolean = false;
  tipTrig: boolean = false;
  wfdTrig: boolean = false;
  gwyTrig: boolean = false;

  // Checks if garda regions are selected, DB region names
  public strregions = {
    "garda-region-eastern":"eastern-region",
    "garda-region-dublin-metro":"dublin-region",
    "garda-region-northern":"northern-region",
    "garda-region-western":"western-region",
    "garda-region-southern":"southern-region",
    "garda-region-south-eastern":"south-eastern-region",
}

  //  Subscribes to url changes to catch changes
  //  "region" parameter and update accordingly
  constructor(private route: ActivatedRoute, private location: Location) {
    location.subscribe(x => {
      this.getRegion();
    });
  }

  ngOnInit(): void {
    // Gets region to show on component initialization
    this.getRegion();
  }

  //  Retrieves "region" url parameter and checks for 
  //  special cases where certain components are hidden/shown
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

      let regiontemp = params["regionname"];
      if (regiontemp.indexOf("garda") !== -1) {
        this.nonGardaRegion = false;
        this.regiont = this.strregions[regiontemp];
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
            if (this.birthsCheckRegions.includes(regiontemp)) {
              this.birthsTrig = false;
            } else {
              this.birthsTrig = true;
            }
          }
        }

        this.regiont = regiontemp;
      }
    });
  }
}
