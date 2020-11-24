import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchPublicFalsehood } from 'src/app/models/publicFalsehood';
import { SearchService } from 'src/app/services/search.service';
import { TokenService } from 'src/app/services/token.service';
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

  token: TokenService;

  searchText: String;

  searchRegion: Region[];

  @ViewChild(PublicFalsehoodSearchComponent) searchComponent: PublicFalsehoodSearchComponent
  constructor(token: TokenService, private search: SearchService) {
    this.mode = 0;
    this.createNew = false;

    this.editContents = "";
    this.mainRegion = new RegionEntry();
    this.token = token;

    this.searchText = "";
    this.searchRegion = [];
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

  async onSearchUpdate(event:any){
    let p = this.search.searchRegions(event.target.value)
    p.then((regions: Region[])=> {
      this.searchRegion = regions;
    });
  }

  async getRegion(id: Number) {
    let p = this.search.getRegion(id);
    p.then((region: RegionEntry)=> {
      this.mainRegion = region;
    });

    this.searchText = "";
  }

}
