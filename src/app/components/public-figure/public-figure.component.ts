import { Component, OnInit, ViewChild } from '@angular/core';
import { FalsehoodSearchObject } from 'src/app/models/falsehoods';
import { SearchPublicFalsehood } from 'src/app/models/publicFalsehood';
import { PublicFigure, PublicFigureEntry } from 'src/app/models/publicFigure';
import { ApproveServiceService } from 'src/app/services/approve-service.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';
import { FalsehoodSearchComponent } from '../falsehood-search/falsehood-search.component';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';

@Component({
  selector: 'app-public-figure',
  templateUrl: './public-figure.component.html',
  styleUrls: ['./public-figure.component.css']
})
export class PublicFigureComponent implements OnInit {

  mainFigure: PublicFigureEntry;

  mode: Number;

  createNew: boolean;

  editName: String;
  editContents: String;
  token: TokenService;

  searchText: String;
  searchFigures: PublicFigure[];

  @ViewChild(PublicFalsehoodSearchComponent) publicSearchComponent: PublicFalsehoodSearchComponent;
  @ViewChild(FalsehoodSearchComponent) searchComponent: FalsehoodSearchComponent;
  constructor(token: TokenService, private search: SearchService, private submitService:SubmitService, private approveService: ApproveServiceService) { 
    this.token = token;

    this.searchFigures = [];
    this.searchText = "";
    this.editContents = this.editName = "";

    this.mainFigure = new PublicFigureEntry();

    this.mode = 0;
    this.createNew = false;
  }

  ngOnInit(): void {
  }

  setMode(m: Number) {
    this.mode = m;

    if(this.mode == 2 && this.mainFigure) {
      let searchObj = new SearchPublicFalsehood();
      searchObj.official = this.mainFigure.figure;

      this.publicSearchComponent.initializeList(searchObj);
    } else if(this.mode == 3 && this.mainFigure) {
      let searchObj = new FalsehoodSearchObject();
      searchObj.author = this.mainFigure.figure;
      this.searchComponent.initializeList(searchObj);
    }

  }

  stopCreateNew() {
    this.editContents = "";
    this.editName = "";
    this.createNew=false;
  }

  addNewFig() {
    this.submitService.submitPublicFigure(this.editName, this.editContents).then((res)=> {
      this.stopCreateNew();
      if(res) {
        alert("Successfully Submitted Public Figure Entry!");
      }
    });
  }

  startCreateNew() {
    this.createNew = true;
  }

  async onSearchUpdate(event:any){
    let p = this.search.searchPublicFigures(event.target.value)
    p.then((figures: PublicFigure[])=> {
      this.searchFigures = figures;
    });
  }

  async getFigure(id: Number) {
    let p = this.search.getPublicFigure(id);
    p.then((figure: PublicFigureEntry)=> {
      this.mainFigure = figure;
    });

    this.searchText = "";
  }

  approveFigure(app:boolean){
    this.approveService.approveRegion(app, this.mainFigure.figure.id.valueOf()).then((resp:boolean) => { 
      if(resp) {
        this.mainFigure.figure.approved = 1;
      }
    });
  }
}
