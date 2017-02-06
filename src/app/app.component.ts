import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private tickersUrl = 'https://bitcoin-markets-api.herokuapp.com/ticker/btcpln';

  price = '???';

  constructor (private http: Http) {}

  getTickers() {
    // console.log(this.http);
    return this.http.get(this.tickersUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private updatePrice() {
    this.getTickers().subscribe(res => {
      let price = res['bitmarket.pl'].ticker.vwap.toFixed(2);
      this.price = price;
      document.title = price;
      setTimeout(() => this.updatePrice(), 5e3);
    });
  }

  ngOnInit() {
    this.updatePrice();
  }
}
