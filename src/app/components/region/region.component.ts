import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchPublicFalsehood } from 'src/app/models/publicFalsehood';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
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

  editName: String;
  editContents: String;

  token: TokenService;

  searchText: String;

  searchRegion: Region[];

  @ViewChild(PublicFalsehoodSearchComponent) searchComponent: PublicFalsehoodSearchComponent
  constructor(token: TokenService, private search: SearchService, private submitService:SubmitService) {
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

  addNewReg() {
    this.submitService.submitRegion(this.editName, this.editContents).then((res)=>{
      this.stopCreateNew();
      if(res) {
        alert("Successfully Submitted Region Entry!");
      }
    });
  }

  startCreateNew() {
    this.createNew = true;
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
