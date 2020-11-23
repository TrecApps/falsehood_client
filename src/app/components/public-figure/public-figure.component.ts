import { Component, OnInit, ViewChild } from '@angular/core';
import { FalsehoodSearchObject } from 'src/app/models/falsehoods';
import { SearchPublicFalsehood } from 'src/app/models/publicFalsehood';
import { PublicFigureEntry } from 'src/app/models/publicFigure';
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

  editContents: String;
  token: TokenService;

  @ViewChild(PublicFalsehoodSearchComponent) publicSearchComponent: PublicFalsehoodSearchComponent;
  @ViewChild(FalsehoodSearchComponent) searchComponent: FalsehoodSearchComponent;
  constructor(token: TokenService) { 
    this.token = token;
  }

  ngOnInit(): void {
  }

  setMode(m: Number) {
    this.mode = m;

    if(this.mode == 2 && this.mainFigure) {
      let searchObj = new SearchPublicFalsehood();
      searchObj.authors = [this.mainFigure.figure];

      this.publicSearchComponent.initializeList(searchObj);
    } else if(this.mode == 3 && this.mainFigure) {
      let searchObj = new FalsehoodSearchObject();
      searchObj.authors = [this.mainFigure.figure];
      this.searchComponent.initializeList(searchObj);
    }

  }

  stopCreateNew() {
    this.editContents = "";
    this.createNew=false;
  }

}
