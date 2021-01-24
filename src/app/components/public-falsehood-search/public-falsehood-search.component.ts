import { Component, OnInit } from '@angular/core';
import { FullPublicFalsehood, PublicFalsehood, SearchPublicFalsehood } from 'src/app/models/publicFalsehood';
import { SearchService } from 'src/app/services/search.service';
import { PublicFalsehoodComponent } from '../public-falsehood/public-falsehood.component';

@Component({
  selector: 'app-public-falsehood-search',
  templateUrl: './public-falsehood-search.component.html',
  styleUrls: ['./public-falsehood-search.component.css']
})
export class PublicFalsehoodSearchComponent implements OnInit {

  constructor(private searcher: SearchService) { 
    this.falsehoods = [];
    this.falsehood = null;
  }

  ngOnInit(): void {
  }

  falsehoods: PublicFalsehood[];
  falsehood: FullPublicFalsehood;

  selectFalsehood(falsehood: PublicFalsehood){
    this.searcher.getPublicFalsehood(falsehood.id).then((full: FullPublicFalsehood) => {
      this.falsehood = full;

    });
    
  }

  initializeList(searchObj: SearchPublicFalsehood) {
    this.searcher.searchPublicFalsehoods(searchObj).then((value:PublicFalsehood[])=> {
      console.log("Retrieved Values of {}", value);
      this.falsehoods = value;
      this.falsehood = null;
    }).catch((reason)=> {

    });

  }

  initializeListByRegion(id:Number) {
    this.searcher.searchByRegion(id, 0, 20).then((value:PublicFalsehood[])=> {
      console.log("Retrieved Values of {}", value);
      this.falsehoods = value;
      this.falsehood = null;
    });
  }

  initializeListByInstitution(id:Number) {
    this.searcher.searchByInstitution(id, 0, 20).then((value:PublicFalsehood[])=> {
      console.log("Retrieved Values of {}", value);
      this.falsehoods = value;
      this.falsehood = null;
    });
  }

  initializeSubmittedList(page:number, size:number) {
    this.searcher.searchSubmittedPublicFalsehoods(size, page).then((value:PublicFalsehood[])=> {
      this.falsehoods = value;
      this.falsehood = null;
    });
  }

  nullifyList() {
    this.falsehoods = null;
    this.falsehood = null;
  }
}
