import { Component, OnInit } from '@angular/core';

import * as Trianglify from 'trianglify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(pattern.toSVG());
  }
}
