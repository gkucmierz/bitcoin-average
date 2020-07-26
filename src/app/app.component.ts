import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Trianglify from 'trianglify';

import { timer } from 'rxjs';
import { map, flatMap } from 'rxjs/operators'

const TIMEOUT = 1e3 * 15;

const roundStep = 200;
const round = (size: number) => Math.ceil(size / roundStep) * roundStep;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  width: number;
  height: number;
  price = '';

  constructor(private http: HttpClient) {
    const getPrice = () => this.http.get('https://blockchain.info/tobtc?currency=USD&value=1').pipe(
      map((data: number) => 1 / data)
    );

    timer(0, TIMEOUT).pipe(
      flatMap(getPrice)
    ).subscribe(price => {
      this.price = price.toFixed(2);
    });
  }

  onResize(event) {
    const newWidth = round(event.target.innerWidth);
    const newHeight = round(event.target.innerHeight);
    if (newWidth !== this.width || newHeight !== this.height) {
      this.width = newWidth;
      this.height = newHeight;
      this.updateBackground();
    }
  }

  updateBackground(): void {
    const pattern = Trianglify({
      width: this.width,
      height: this.height
    });
    const svg = document.querySelector('.svg');
    svg.textContent = '';
    svg.appendChild(pattern.toSVG());
  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.updateBackground();
  }
}
