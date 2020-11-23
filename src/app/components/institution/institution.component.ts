import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchPublicFalsehood } from 'src/app/models/publicFalsehood';
import { TokenService } from 'src/app/services/token.service';
import { InstitutionEntry } from '../../models/institution';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';

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
  @ViewChild(PublicFalsehoodSearchComponent) searchComponent: PublicFalsehoodSearchComponent;
  token: TokenService;
  constructor(token: TokenService) {
    this.mode = 0;
    this.createNew = false;

    this.editContents = "";
    this.mainInst = new InstitutionEntry();

    this.token = token;
   }

  ngOnInit() {
  }

  setMode(m: Number) {
    this.mode = m;

    if(this.mode == 2 && this.mainInst) {
      let searchObj = new SearchPublicFalsehood();
      searchObj.institutions = [this.mainInst.institution];

      this.searchComponent.initializeList(searchObj);
    }

  }

  stopCreateNew() {
    this.editContents = "";
    this.createNew=false;
  }

}
