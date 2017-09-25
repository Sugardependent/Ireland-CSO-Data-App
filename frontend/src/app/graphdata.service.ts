import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/publishReplay";

import { GraphData } from "./graphdata";

@Injectable()
export class GraphService {
  private baseUrl: string = "http://127.0.0.1:8000/graphs";
  private _graphData: Observable<GraphData> = null;

  //  Caches HTTP Requests
  private graphDataCached = new Map<string, Observable<GraphData>>();

  constructor(private http: Http) {}

  //  Retreives graph data from DRF API based on url parameters
  get(regiont: string, grapht: string, gendert: string): Observable<GraphData> {
    let idString = regiont + grapht + gendert;
    console.log(idString);

    //  Checks for cached data and restricts to 20 cached graph values
    if (!this.graphDataCached.has(idString)) {
      if (this.graphDataCached.size >= 6) {
        let firstCacheIter = this.graphDataCached.keys();
        this.graphDataCached.delete(firstCacheIter.next().value);
      }
      let graphData$ = this.http
        .get(`${this.baseUrl}/prop/${regiont}/${grapht}/${gendert}?format=json`)
        .map(mapGraph)
        .publishReplay(5)
        .refCount();

      this.graphDataCached.set(idString, graphData$);
      this._graphData = graphData$;
    } else {
      this._graphData = this.graphDataCached.get(idString);
    }

    return this._graphData;
  }

  getCrime(regiont: string, grapht: string): Observable<GraphData> {
    let gendert = "both";
    let idString = regiont + grapht + gendert;
    console.log(idString);

    //  Checks for cached data and restricts to 20 cached graph values
    if (!this.graphDataCached.has(idString)) {
      if (this.graphDataCached.size >= 6) {
        let firstCacheIter = this.graphDataCached.keys();
        this.graphDataCached.delete(firstCacheIter.next().value);
      }
      let graphData$ = this.http
        .get(`${this.baseUrl}/crime/${regiont}/${grapht}?format=json`)
        .map(mapGraph)
        .publishReplay(5)
        .refCount();

      this.graphDataCached.set(idString, graphData$);
      this._graphData = graphData$;
    } else {
      this._graphData = this.graphDataCached.get(idString);
    }

    return this._graphData;
  }


  getbirths(regiont: string, grapht: string): Observable<GraphData> {
    let gendert = "both";
    let idString = regiont + grapht + gendert;
    console.log(idString);

    //  Checks for cached data and restricts to 20 cached graph values
    if (!this.graphDataCached.has(idString)) {
      if (this.graphDataCached.size >= 6) {
        let firstCacheIter = this.graphDataCached.keys();
        this.graphDataCached.delete(firstCacheIter.next().value);
      }
      console.log(`${this.baseUrl}/birth/${regiont}/${grapht}?format=json`);
      let graphData$ = this.http
        .get(`${this.baseUrl}/birth/${regiont}/${grapht}?format=json`)
        .map(mapGraph)
        .publishReplay(5)
        .refCount();

      this.graphDataCached.set(idString, graphData$);
      this._graphData = graphData$;
    } else {
      this._graphData = this.graphDataCached.get(idString);
    }

    return this._graphData;
  }
}

//  Maps the JSON Data
function toGraph(r: any): GraphData {
  let graphdata = <GraphData>{
    data_id: r[0].data_id,
    gender: r[0].gender,
    region_name: r[0].region_name,
    graph_name: r[0].graph_name,
    points: r[0].points
  };

  return graphdata;
}

function mapGraph(response: Response): GraphData {
  return toGraph(response.json());
}
