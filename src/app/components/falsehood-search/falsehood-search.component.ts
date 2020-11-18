import { Component, OnInit } from '@angular/core';
import { Falsehood, FalsehoodSearchObject } from 'src/app/models/falsehoods';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-falsehood-search',
  templateUrl: './falsehood-search.component.html',
  styleUrls: ['./falsehood-search.component.css']
})
export class FalsehoodSearchComponent implements OnInit {

  constructor(private searcher: SearchService) { 
    this.falsehoods = [];
  }

  ngOnInit(): void {
  }

  falsehoods: Falsehood[];

  initializeList(searchObj: FalsehoodSearchObject) {
    this.searcher.searchFalsehoods(searchObj).then((value:Falsehood[])=> {
      this.falsehoods = value;
    });
  }
}
