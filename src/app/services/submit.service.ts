import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FullFalsehood } from '../models/falsehoods';
import { Institution, InstitutionEntry } from '../models/institution';
import { MediaOutlet, MediaOutletEntry } from '../models/mediaOutlet';
import { FullPublicFalsehood } from '../models/publicFalsehood';
import { PublicFigure, PublicFigureEntry } from '../models/publicFigure';
import { Region, RegionEntry } from '../models/region';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
    this.publicFalsehoodMapping = "Update/PublicFalsehood"; 
    this.falsehoodMapping = "Update/Falsehood";
  }

  private falsehoodMapping: String;
  private publicFalsehoodMapping: String;

  async submitRegion(name: String, contents: String) : Promise<boolean> {
    let entry = new RegionEntry();
    entry.contents = contents;
    entry.region = new Region();
    entry.region.name = name;

    let result:boolean;

    await this.httpClient.post(environment.FALSEHOOD_URL + this.publicFalsehoodMapping + "/AddRegion",
      entry, {headers: this.tokenService.httpHeaders}
      ).toPromise().
      then(() => { result = true;}).
      catch((reason) => {
        result = false;
        alert(reason.error.message || reason.message);
      });
      return result;
  }

  async submitInstitution(name: String, contents: String) : Promise<boolean> {
    let entry = new InstitutionEntry();
    entry.contents = contents;
    entry.institution = new Institution();
    entry.institution.name = name;

    let result:boolean;

    await this.httpClient.post(environment.FALSEHOOD_URL + this.publicFalsehoodMapping + "/AddInstitution",
      entry, {headers: this.tokenService.httpHeaders}
      ).toPromise().
      then(() => { result = true;}).
      catch((reason) => {
        result = false;
        alert(reason.error.message || reason.message);
      });
      return result;
  }

  async submitMediaOutlet(name: String, contents: String, year: number) : Promise<boolean> {
    let entry = new MediaOutletEntry();
    entry.text = contents.toString();
    entry.outlet = new MediaOutlet();
    entry.outlet.name = name;
    entry.outlet.foundationYear = year;

    let result:boolean;

    await this.httpClient.post(environment.FALSEHOOD_URL + this.falsehoodMapping + "/AddOutlet",
      entry, {headers: this.tokenService.httpHeaders}
      ).toPromise().
      then(() => { result = true;}).
      catch((reason) => {
        result = false;
        alert(reason.error.message || reason.message);
      });
      return result;
  }

  async submitPublicFigure(name: String, contents: String) : Promise<boolean> {
    let entry = new PublicFigureEntry();
    entry.text = contents.toString();
    entry.figure = new PublicFigure();

    let names = name.split(' ');

    entry.figure.firstname = names[0];
    if(names.length == 2) {
      entry.figure.lastName = names[1];
    } else {
      let mid = names[1];

      for(let rust = 2; rust < names.length-1; rust++)
      {
        mid = mid.concat(' ', names[rust]);
      }
      entry.figure.middleNames = mid;
      entry.figure.lastName = names[names.length-1];
    }


    let result:boolean;

    await this.httpClient.post(environment.FALSEHOOD_URL + "PublicFigure/Add",
      entry, {headers: this.tokenService.httpHeaders}
      ).toPromise().
      then(() => { result = true;}).
      catch((reason) => {
        result = false;
        alert(reason.error.message || reason.message);
      });
      return result;
  }

  async submitPublicFalsehood(falsehood: FullPublicFalsehood) : Promise<boolean> {
    let ret: boolean;

    await this.httpClient.post(environment.FALSEHOOD_URL + "Update/PublicFalsehood/Insert", falsehood,
    {headers: this.tokenService.httpHeaders}).toPromise().then(()=> ret = true).catch((reason) => {
      ret = false;
      alert(reason.error.message || reason.message);
    });
    return ret;
  }

  async submitFalsehod(falsehood: FullFalsehood) : Promise<boolean> {
    let ret: boolean;

    await this.httpClient.post(environment.FALSEHOOD_URL + "Update/Falsehood/Insert", falsehood,
    {headers: this.tokenService.httpHeaders}).toPromise().then(()=> ret = true).catch((reason) => {
      ret = false;
      alert(reason.error.message || reason.message);
    });
    return ret;
  }

}
