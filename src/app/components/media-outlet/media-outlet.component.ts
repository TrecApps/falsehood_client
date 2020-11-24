import { Component, OnInit, ViewChild } from '@angular/core';
import { FalsehoodSearchObject } from 'src/app/models/falsehoods';
import { MediaOutlet, MediaOutletEntry } from 'src/app/models/mediaOutlet';
import { SearchService } from 'src/app/services/search.service';
import { TokenService } from 'src/app/services/token.service';
import { FalsehoodSearchComponent } from '../falsehood-search/falsehood-search.component';

@Component({
  selector: 'app-media-outlet',
  templateUrl: './media-outlet.component.html',
  styleUrls: ['./media-outlet.component.css']
})
export class MediaOutletComponent implements OnInit {

  mainOutlet: MediaOutletEntry;
  mode: Number;

  createNew: boolean;

  editContents: String;

  searchText: String;
  searchOutlets: MediaOutlet[];

  @ViewChild(FalsehoodSearchComponent) searchComponent: FalsehoodSearchComponent;
  token: TokenService;

  constructor(token: TokenService, private search: SearchService) {
    this.token = token;

    this.searchOutlets = [];
    this.searchText = "";
   }

  ngOnInit(): void {
  }

  setMode(m: Number) {
    this.mode = m;

    if(this.mode == 2 && this.mainOutlet) {
      let searchObj = new FalsehoodSearchObject();
      searchObj.outlets = [this.mainOutlet.outlet.name];

      this.searchComponent.initializeList(searchObj);
    }
  }

  stopCreateNew() {
    this.editContents = "";
    this.createNew=false;
  }

  async onSearchUpdate(event:any){
    let p = this.search.searchMediaOutlets(event.target.value)
    p.then((outlets: MediaOutlet[])=> {
      this.searchOutlets = outlets;
    });
  }

  async getOutlet(id: Number) {
    let p = this.search.getMediaOutlet(id);
    p.then((outlet: MediaOutletEntry)=> {
      this.mainOutlet = outlet;
    });

    this.searchText = "";
  }

}
