import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appeal-component',
  templateUrl: './appeal-component.component.html',
  styleUrls: ['./appeal-component.component.css']
})
export class AppealComponent implements OnInit {

  appealMode: number;

  constructor() { 
    this.appealMode = 0;
  }

  ngOnInit(): void {
  }

  setAppealMode(appealMode: number) {
    this.appealMode = appealMode;
  }

}
