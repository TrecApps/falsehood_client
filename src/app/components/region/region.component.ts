import { Component, OnInit } from '@angular/core';
import {Region, RegionEntry } from '../../models/region';

import { MarkedPipe } from '../../resources/marked.pipe';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  mainRegion: RegionEntry;

  mode: Number;

  createNew: boolean;

  editContents: String;

  constructor() {
    this.mode = 0;
    this.createNew = false;

    this.editContents = "";
    this.mainRegion = new RegionEntry();

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
