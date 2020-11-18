import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Falsehood, FalsehoodSearchObject } from '../models/falsehoods';
import { PublicFalsehood, SearchPublicFalsehood } from '../models/publicFalsehood';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  async searchFalsehoods(searchObj: FalsehoodSearchObject): Promise<Falsehood[]> {
    
    let ret: Falsehood[];
    await this.httpClient.post(environment.FALSEHOOD_URL + "Falsehood/list", searchObj).toPromise()
      .then((falsehoods: Falsehood[]) => {
        ret = falsehoods;
      }).catch((reason)=> {
        alert(reason);
      });
    return ret;
  }

  async searchPublicFalsehoods(searchObj: SearchPublicFalsehood): Promise<PublicFalsehood[]> {
    
    let ret: PublicFalsehood[];
    await this.httpClient.post(environment.FALSEHOOD_URL + "PublicFalsehood/list", searchObj).toPromise()
      .then((falsehoods: PublicFalsehood[]) => {
        ret = falsehoods;
      }).catch((reason)=> {
        alert(reason);
      });
    return ret;
  }

}
