import { Component, OnInit } from '@angular/core';
import { InstitutionEntry } from '../../models/institution';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit {

  mainInst: InstitutionEntry;

  mode: Number;

  createNew: boolean;

  editContents: String;

  constructor() {
    this.mode = 0;
    this.createNew = false;

    this.editContents = "";
    this.mainInst = new InstitutionEntry();

   }

  ngOnInit() {
  }

  setMode(m: Number) {
    this.mode = m;
  }

  stopCreateNew() {
    this.editContents = "";
    this.createNew=false;
  }

}
