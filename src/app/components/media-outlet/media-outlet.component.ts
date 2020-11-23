import { Component, OnInit, ViewChild } from '@angular/core';
import { FalsehoodSearchObject } from 'src/app/models/falsehoods';
import { MediaOutletEntry } from 'src/app/models/mediaOutlet';
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

  @ViewChild(FalsehoodSearchComponent) searchComponent: FalsehoodSearchComponent;
  token: TokenService;

  constructor(token: TokenService) {
    this.token = token;
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

}
