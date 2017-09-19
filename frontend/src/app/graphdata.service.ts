import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/publishReplay';

import { GraphData } from "./graphdata";

@Injectable()
export class GraphService {
  private baseUrl: string = "http://127.0.0.1:8000/graphs";
  private _graphData: Observable<GraphData> = null;

  constructor(private http: Http) {}

  /*
  get(id: number): Observable<GraphData> {
    let graphdata$ = this.http
      .get(`${this.baseUrl}/${id}/complete?format=json`)
      .map(mapGraph);
    
    /* 
    this.http.get(`http://swapi.co/api/people/1`).map((response:Response) => {
      console.log(response.json());
      response.json();
    }).subscribe();

    this.http.get('http://127.0.0.1:8000/graphs/439/complete?format=json').map((response:Response) => {
      console.log(response.json());
      response.json();
      }).subscribe();
    */

  /*
    return graphdata$;
  }
  */

  get(regiont: string, grapht: string, gendert: string): Observable<GraphData> {
    /*
    console.log(
      `${this.baseUrl}/prop/${regiont}/${grapht}/${gendert}?format=json`
    );
    */
    if (!this._graphData) {
      this._graphData = this.http
        .get(`${this.baseUrl}/prop/${regiont}/${grapht}/${gendert}?format=json`)
        .map(mapGraph);
    } 

    return this._graphData;
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    return headers;
  }
}

function mapGraphs(response: Response): GraphData[] {
  // The response of the API has a results
  // property with the actual results
  return response.json().results.map(toGraph);
}

function toGraph(r: any): GraphData {
  let graphdata = <GraphData>{
    data_id: r[0].data_id,
    gender: r[0].gender,
    region_name: r[0].region_name,
    graph_name: r[0].graph_name,
    points: r[0].points
  };
  //console.log('Parsed graph:', graphdata);
  return graphdata;
}

function mapGraph(response: Response): GraphData {
  return toGraph(response.json());
}
