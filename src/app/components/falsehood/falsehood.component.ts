import { Component, OnInit, ViewChild } from '@angular/core';
import { Falsehood, FalsehoodSearchObject, FullFalsehood } from 'src/app/models/falsehoods';
import { MediaOutlet } from 'src/app/models/mediaOutlet';
import { PublicFigure } from 'src/app/models/publicFigure';
import { SearchService } from 'src/app/services/search.service';
import { FalsehoodSearchComponent } from '../falsehood-search/falsehood-search.component';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';

@Component({
  selector: 'app-falsehood',
  templateUrl: './falsehood.component.html',
  styleUrls: ['./falsehood.component.css']
})
export class FalsehoodComponent implements OnInit {
  // Resources for searching
  search: FalsehoodSearchObject; // main search object
  dateSearchMode:number;
  outletList: MediaOutlet[];
  searchOutlet: string;
  authorList: PublicFigure[];
  searchAuthor:string;

  mainFalsehood: FullFalsehood;
  
  createNew: boolean;
  doSearch:boolean;

  // Resources for creating new Falsehood
  newFalsehood: FullFalsehood;

  @ViewChild(FalsehoodSearchComponent) searchComponent: FalsehoodSearchComponent;

  constructor(private searchService: SearchService) { 
    this.createNew = this.doSearch = false;
    this.search = new FalsehoodSearchObject();
  }
  // Sub Search methods
  startSearch() {
    this.doSearch = true;
  }


  async onSearchOutlet(event:any){
    let p = this.searchService.searchMediaOutlets(event.target.value)
    p.then((outlets: MediaOutlet[])=> {
      this.outletList = outlets;
    });
  }

  setOutlet(out: MediaOutlet) {
    this.search.outlet = out;
  }

  async onSearchAuthor(event:any){
    let p = this.searchService.searchPublicFigures(event.target.value)
    p.then((figures: PublicFigure[])=> {
      this.authorList = figures;
    });
  }

  setAuthor(out: PublicFigure) {
    this.search.author = out;
  }

  submitSearch() {
    this.searchComponent.initializeList(this.search);
    this.search = new FalsehoodSearchObject();
    this.doSearch = false;
  }


  // Maintainence Methods
  ngOnInit(): void {
  }

  startCreateNew() {
    this.createNew = true;
    this.doSearch = false;
    this.newFalsehood = new FullFalsehood();
    this.newFalsehood.metadata = new Falsehood();
    this.newFalsehood.metadata.id = null;
    this.newFalsehood.metadata.status = 0;
  }

  setNewAuthor(out: PublicFigure, t: number) {
    if(t == 1) {
      this.newFalsehood.metadata.author1 = out;
    } else {
      this.newFalsehood.metadata.author2 = out;
    }
  }

  setNewOutlet(out: MediaOutlet) {
    this.newFalsehood.metadata.outlet = out;
  }

  stopCreateNew() {
    this.newFalsehood = null;
    this.createNew=false;
  }

  setDateSearchMode(val: number) {
    this.dateSearchMode = val;
  }

}
