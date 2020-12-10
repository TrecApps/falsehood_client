import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchPublicFalsehood } from 'src/app/models/publicFalsehood';
import { ApproveServiceService } from 'src/app/services/approve-service.service';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';
import { Institution, InstitutionEntry } from '../../models/institution';
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

  editName: String;
  editContents: String;
  @ViewChild(PublicFalsehoodSearchComponent) searchComponent: PublicFalsehoodSearchComponent;
  token: TokenService;

  searchInst: Institution[];
  searchText: String;

  constructor(token: TokenService, private search: SearchService, private submitService:SubmitService, private approveService: ApproveServiceService) {
    this.mode = 0;
    this.createNew = false;

    this.editContents = "";
    this.mainInst = new InstitutionEntry();

    this.token = token;

    this.searchInst = [];
    this.searchText = "";
   }

  ngOnInit() {
  }

  setMode(m: Number) {
    this.mode = m;

    if(this.mode == 2 && this.mainInst) {
      let searchObj = new SearchPublicFalsehood();
      searchObj.institution = this.mainInst.institution;

      this.searchComponent.initializeList(searchObj);
    }

  }

  addNewInst() {
    this.submitService.submitInstitution(this.editName, this.editContents).then((res)=>{
      this.stopCreateNew();
      if(res) {
        alert("Successfully Submitted Institution Entry!");
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
    let p = this.search.searchInstitutions(event.target.value)
    p.then((inst: Institution[])=> {
      this.searchInst = inst;
    });
  }

  async getInst(id: Number) {
    let p = this.search.getInstitution(id);
    p.then((inst: InstitutionEntry)=> {
      this.mainInst = inst;
    });

    this.searchText = "";
  }

  approveInst(app: boolean) {
    this.approveService.approveInstitution(app, this.mainInst.institution.id.valueOf()).then((resp:boolean) => { 
      if(resp) {
        this.mainInst.institution.approved = 1;
      }
    });
  }

}
