import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SearchPublicFalsehood, FullPublicFalsehood, PublicFalsehood } from 'src/app/models/publicFalsehood';
import { Region } from 'src/app/models/region';
import { Institution } from 'src/app/models/institution';
import { PublicFigure } from 'src/app/models/publicFigure';
import { SearchService } from 'src/app/services/search.service';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';
import { SubmitService } from 'src/app/services/submit.service';
import { TokenService } from 'src/app/services/token.service';
import { ApproveServiceService } from 'src/app/services/approve-service.service';

@Component({
  selector: 'app-public-falsehood',
  templateUrl: './public-falsehood.component.html',
  styleUrls: ['./public-falsehood.component.css']
})
export class PublicFalsehoodComponent implements OnInit {
  // Resources for searching
  search: SearchPublicFalsehood; // main search object
  dateSearchMode:number;
  regionList: Region[];
  searchRegion: string;
  institutionList: Institution[];
  searchInsitution: string;
  authorList: PublicFigure[];
  searchAuthor:string;

  mainFalsehood: FullPublicFalsehood;

  createNew: boolean;
  doSearch:boolean;

  // Resources for creating new Falsehood
  newFalsehood: FullPublicFalsehood;

  // Handling Submitted Falsehoods
  doSubmitted: boolean;
  submittedPage: number;
  submitSize: number;
  submitReason: string;

  tokenService: TokenService;

  @ViewChild(PublicFalsehoodSearchComponent) searchComponent: PublicFalsehoodSearchComponent;
  @ViewChild('pfTagWarning') warningEl: ElementRef;
  @ViewChild('pfNewSubmit')  submitEl: ElementRef;
  constructor(private searchService: SearchService, private submitter: SubmitService,
     tokenService: TokenService, private approveService: ApproveServiceService,
     searchComponent: PublicFalsehoodSearchComponent) { 
    this.createNew = this.doSearch = false;
    this.search = new SearchPublicFalsehood();

    this.doSubmitted = false;
    this.submitSize = 20;
    this.submittedPage = 0;

    this.tokenService = tokenService;
    this.submitReason = "";
    this.searchComponent = searchComponent;
  }

  Approve(app: boolean) {
    this.approveService.approvePublicFalsehood(app, this.searchComponent.falsehood.metadata.id.valueOf(), this.submitReason);
  }

  // Sub Search methods
  startSearch() {
    this.doSearch = true;
    this.doSubmitted = false;
  }

  async onSearchAuthor(event:any){
    let p = this.searchService.searchPublicFigures(event.target.value)
    p.then((figures: PublicFigure[])=> {
      this.authorList = figures;
    });
  }

  setAuthor(out: PublicFigure) {
    this.search.official = out;
  }

  async onSearchInst(event:any){
    let p = this.searchService.searchInstitutions(event.target.value)
    p.then((regions: Institution[])=> {
      this.institutionList = regions;
    });
  }

  setInst(out: Institution) {
    this.search.institution = out;
  }

  async onSearchReg(event:any){
    let p = this.searchService.searchRegions(event.target.value)
    p.then((regions: Region[])=> {
      this.regionList = regions;
    });
  }

  setReg(out: Region) {
    this.search.region = out;
  }

  submitSearch() {
    this.searchComponent.initializeList(this.search);
    this.search = new SearchPublicFalsehood();
    this.doSearch = false;
  }

  // Maintainence Methods
  ngOnInit(): void {
  }

  startCreateNew() {
    this.createNew = true;
    this.doSearch = false;
    this.newFalsehood = new FullPublicFalsehood();
    this.newFalsehood.metadata = new PublicFalsehood();
    this.newFalsehood.metadata.id = null;
    this.newFalsehood.metadata.status = 0;
  }
  submitNewFalsehod() {
    this.submitter.submitPublicFalsehood(this.newFalsehood).then((result: boolean)=> {
      if(result) {
        this.stopCreateNew();
      } 
    });
  }

  setNewAuthor(out: PublicFigure) {
    this.newFalsehood.metadata.official = out;
  }

  setNewInst(out: Institution) {
    this.newFalsehood.metadata.institution = out;
  }

  setNewReg(out: Region) {
    this.newFalsehood.metadata.region = out;
  }

  stopCreateNew() {
    this.newFalsehood = null;
    this.createNew=false;
  }

  setDateSearchMode(val: number) {
    this.dateSearchMode = val;
  }

  // Methds For handling Submitted falsehoods
  startSubmittedSearch() {
    this.doSearch = false;
    this.doSubmitted = true;
  }

  getSubmittedFalsehoods(){
    this.searchComponent.initializeSubmittedList(this.submittedPage, this.submitSize);
  }

  inspectTagsField() {
    if(this.newFalsehood.metadata.tags.length > 400) {
      this.warningEl.nativeElement.hidden = false;
      this.submitEl.nativeElement.hidden = true;
    } else {
      this.warningEl.nativeElement.hidden = true;
      this.submitEl.nativeElement.hidden = false;
    }
  }
}
