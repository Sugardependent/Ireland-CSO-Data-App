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
  
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {
    location.subscribe(x => {
      this.getRegion()
    })
  }

  ngOnInit(): void {
    this.getRegion();
  }

  public getRegion(): void {
    this.route.params.subscribe(params => {
      let regiontemp = params['regionname'];
      if (regiontemp.indexOf("garda") !== -1) {
        this.nonGardaRegion = false;
        this.regiont = regiontemp.replace("-", " ");
      } else {
        this.nonGardaRegion = true;
        this.regiont = regiontemp;
      }
    });
  }

  /*
  public getRegion(): void {
    this.route.paramMap
    .switchMap((params: ParamMap) => params.get('regionname'))
    .bufferTime(100)
    .subscribe(urlregion => {
      if (urlregion.length != 0) {
        this.regiont = urlregion.join('');
        console.log(this.regiont);
      } else if (urlregion.length == 0) {
        console.log("no county");
      }
    });
  }
  */


}
