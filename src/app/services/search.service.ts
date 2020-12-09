import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Falsehood, FalsehoodSearchObject } from '../models/falsehoods';
import { PublicFalsehood, SearchPublicFalsehood } from '../models/publicFalsehood';
import { Region, RegionEntry } from '../models/region';
import { Institution, InstitutionEntry } from '../models/institution';
import { PublicFigure, PublicFigureEntry } from '../models/publicFigure';
import { MediaOutlet, MediaOutletEntry } from '../models/mediaOutlet';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  async searchFalsehoods(searchObj: FalsehoodSearchObject): Promise<Falsehood[]> {
    
    let ret: Falsehood[];
    await this.httpClient.post(environment.FALSEHOOD_URL + "Falsehood/searchConfirmed", searchObj).toPromise()
      .then((falsehoods: Falsehood[]) => {
        ret = falsehoods;
      }).catch((reason)=> {
        alert(reason);
      });
    return ret;
  }

  async searchPublicFalsehoods(searchObj: SearchPublicFalsehood): Promise<PublicFalsehood[]> {
    
    let ret: PublicFalsehood[];
    await this.httpClient.post(environment.FALSEHOOD_URL + "PublicFalsehood/searchConfirmed", searchObj).toPromise()
      .then((falsehoods: PublicFalsehood[]) => {
        ret = falsehoods;
      }).catch((reason)=> {
        alert(reason);
      });
    return ret;
  }

  async searchRegions(searchTerm: String): Promise<Region[]> {
    let ret: Region[];

    await this.httpClient.get(environment.FALSEHOOD_URL + `PublicFalsehood/Regions/${searchTerm.replace(' ', '_')}`)
      .toPromise().then((regions: Region[]) => {
        ret = regions;
      }).catch((reason)=> {
        alert(reason);
      });
      return ret;
  }

  async getRegion(id: Number): Promise<RegionEntry> {
    let ret: RegionEntry;
    await this.httpClient.get(environment.FALSEHOOD_URL + `PublicFalsehood/Region/${id}`)
    .toPromise().then((region: RegionEntry) => {
      ret = region;
    }).catch((reason)=> {
      alert(reason);
    });

    return ret;
  }

  async searchInstitutions(searchTerm: String): Promise<Institution[]> {
    let ret: Institution[];

    await this.httpClient.get(environment.FALSEHOOD_URL + `PublicFalsehood/Institutions/${searchTerm.replace(' ', '_')}`)
      .toPromise().then((inst: Institution[]) => {
        ret = inst;
      }).catch((reason)=> {
        alert(reason.message || reason.error.message);
      });
      return ret;
  }

  async getInstitution(id: Number): Promise<InstitutionEntry> {
    let ret: InstitutionEntry;
    await this.httpClient.get(environment.FALSEHOOD_URL + `PublicFalsehood/Institution/${id}`)
    .toPromise().then((inst: InstitutionEntry) => {
      ret = inst;
    }).catch((reason)=> {
      alert(reason.message || reason.error.message);
    });

    return ret;
  }

  async searchPublicFigures(searchTerm: String): Promise<PublicFigure[]> {
    let ret: PublicFigure[];

    await this.httpClient.get(environment.FALSEHOOD_URL + `PublicFigure/listByName/${searchTerm.replace(' ', '_')}`)
    .toPromise().then((figures: PublicFigure[]) => {
      ret = figures;
    }).catch((reason)=> {
      alert(reason);
    });

    return ret;
  }

  async getPublicFigure(id: Number): Promise<PublicFigureEntry> {
    let ret: PublicFigureEntry

    await this.httpClient.get(environment.FALSEHOOD_URL + `PublicFigure/id/${id}`)
    .toPromise().then((figures: PublicFigureEntry) => {
      ret = figures;
    }).catch((reason)=> {
      alert(reason);
    });

    return ret;
  }

  async searchMediaOutlets(searchTerm: String): Promise<MediaOutlet[]> {
    let ret: MediaOutlet[];

    await this.httpClient.get(environment.FALSEHOOD_URL + `Falsehood/outlet/${searchTerm.replace(' ', '_')}`)
    .toPromise().then((outlets: MediaOutlet[]) => {
      ret = outlets;
    }).catch((reason)=> {
      alert(reason);
    });

    return ret;
  }

  async getMediaOutlet(id: Number): Promise<MediaOutletEntry> {
    let ret: MediaOutletEntry

    await this.httpClient.get(environment.FALSEHOOD_URL + `Falsehood/outletId/${id}`)
    .toPromise().then((outlet: MediaOutletEntry) => {
      ret = outlet;
    }).catch((reason)=> {
      alert(reason);
    });

    return ret;
  }
}
