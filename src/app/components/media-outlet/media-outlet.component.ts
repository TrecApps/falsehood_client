import { Component, OnInit, ViewChild } from '@angular/core';
import { FalsehoodSearchObject } from 'src/app/models/falsehoods';
import { MediaOutlet, MediaOutletEntry } from 'src/app/models/mediaOutlet';
import { SearchService } from 'src/app/services/search.service';
import { SubmitService } from 'src/app/services/submit.service';
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
  editYear:number;

  createNew: boolean;

  editName: String;
  editContents: String;
  token: TokenService;

  searchText: String;
  searchOutlets: MediaOutlet[];

  @ViewChild(FalsehoodSearchComponent) searchComponent: FalsehoodSearchComponent;

  constructor(token: TokenService, private search: SearchService, private submitService:SubmitService) {
    this.token = token;

    this.searchOutlets = [];
    this.searchText = this.editContents = this.editName = "";

    this.mainOutlet = new MediaOutletEntry();
    this.mode = 0;
    this.createNew = false;

    this.editYear = 2000;
   }

  ngOnInit(): void {
  }

  setMode(m: Number) {
    this.mode = m;

    if(this.mode == 2 && this.mainOutlet) {
      let searchObj = new FalsehoodSearchObject();
      searchObj.outlet = this.mainOutlet.outlet;

      this.searchComponent.initializeList(searchObj);
    }
  }

  stopCreateNew() {
    this.editContents = "";
    this.editName = "";
    this.createNew=false;
  }

  addNewOut() {
    this.submitService.submitMediaOutlet(this.editName, this.editContents, this.editYear).then((res)=> {
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
