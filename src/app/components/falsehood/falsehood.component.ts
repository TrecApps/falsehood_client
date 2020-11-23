import { Component, OnInit } from '@angular/core';
import { FullFalsehood } from 'src/app/models/falsehoods';

@Component({
  selector: 'app-falsehood',
  templateUrl: './falsehood.component.html',
  styleUrls: ['./falsehood.component.css']
})
export class FalsehoodComponent implements OnInit {

  mainFalsehood: FullFalsehood;
  createNew: boolean;

  // Resources for creating new Falsehood
  newFalsehoodOutlet: String;
  newFalsehoodCLie: String;
  newFalsehoodMT: Number;
  newFalsehoodSev: Number;
  newFalsehoodA1: String;
  newFalsehoodA2: String;
  newFalsehoodDate: Date;

  editContents: String;
  constructor() { 
    this.createNew = false;
  }

  ngOnInit(): void {
  }

  stopCreateNew() {
    this.editContents = "";
    this.createNew=false;
  }

}
