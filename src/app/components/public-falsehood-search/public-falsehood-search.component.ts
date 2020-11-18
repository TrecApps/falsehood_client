import { Component, OnInit } from '@angular/core';
import { PublicFalsehood, SearchPublicFalsehood } from 'src/app/models/publicFalsehood';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-public-falsehood-search',
  templateUrl: './public-falsehood-search.component.html',
  styleUrls: ['./public-falsehood-search.component.css']
})
export class PublicFalsehoodSearchComponent implements OnInit {

  constructor(private searcher: SearchService) { 
    this.falsehoods = [];
  }

  ngOnInit(): void {
  }

  falsehoods: PublicFalsehood[];

  initializeList(searchObj: SearchPublicFalsehood) {
    this.searcher.searchPublicFalsehoods(searchObj).then((value:PublicFalsehood[])=> {
      this.falsehoods = value;
    });
  }
}
