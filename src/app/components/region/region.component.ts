import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchPublicFalsehood } from 'src/app/models/publicFalsehood';
import {Region, RegionEntry } from '../../models/region';

import { MarkedPipe } from '../../resources/marked.pipe';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';

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

  @ViewChild(PublicFalsehoodSearchComponent) searchComponent: PublicFalsehoodSearchComponent
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

    if(this.mode == 2 && this.mainRegion) {
      let searchObj = new SearchPublicFalsehood();
      searchObj.regions = [this.mainRegion.region];

      this.searchComponent.initializeList(searchObj);
    }

  }

  stopCreateNew() {
    this.editContents = "";
    this.createNew=false;
  }

}
