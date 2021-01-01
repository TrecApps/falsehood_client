import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ApproveServiceService {

  private falsehoodMapping:String;
  private publicFalsehoodMapping:String;
  private publicFigureMapping: String;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { 
    this.falsehoodMapping = "Update/Falsehood";
    this.publicFalsehoodMapping = "Update/PublicFalsehood";
    this.publicFigureMapping = "PublicFigure";
  }

  async approvePublicFigure(app:boolean, id:number) : Promise<boolean> {
    let ret:boolean;

    await this.httpClient.put(environment.FALSEHOOD_URL + this.publicFigureMapping + (app ? "/Approve" : "/Reject"), id, 
    {headers: this.tokenService.httpHeaders}).toPromise().
      then(()=> {ret = true}).catch((reason) => {
        ret = false;
        alert(reason.error.message || reason.message);
      });

    return ret;
  }

  async approveRegion(app:boolean, id:number) : Promise<boolean> {
    let ret:boolean;

    await this.httpClient.put(environment.FALSEHOOD_URL + this.publicFalsehoodMapping + (app ? "/ApproveRegion" : "/RejectRegion"), id, 
    {headers: this.tokenService.httpHeaders}).toPromise().
      then(()=> {ret = true}).catch((reason) => {
        ret = false;
        alert(reason.error.message || reason.message);
      });

    return ret;
  }

  async approveInstitution(app:boolean, id:number) : Promise<boolean> {
    let ret:boolean;

    await this.httpClient.put(environment.FALSEHOOD_URL + this.publicFalsehoodMapping + (app ? "/ApproveInstitution" : "/RejectInstitution"), id, 
    {headers: this.tokenService.httpHeaders}).toPromise().
      then(()=> {ret = true}).catch((reason) => {
        ret = false;
        alert(reason.error.message || reason.message);
      });

    return ret;
  }

  async approveOutlet(app:boolean, id:number) : Promise<boolean> {
    let ret:boolean;

    await this.httpClient.put(environment.FALSEHOOD_URL + this.falsehoodMapping + (app ? "/ApproveOutlet" : "/RejectOutlet"), id, 
    {headers: this.tokenService.httpHeaders}).toPromise().
      then(()=> {ret = true}).catch((reason) => {
        ret = false;
        alert(reason.error.message || reason.message);
      });

    return ret;
  }

  async approveFalsehood(app:boolean, id: number, reason: string) {
    await this.httpClient.put(environment.FALSEHOOD_URL + `Update/Falsehood/${app ? 'Approve' : 'Reject'}`,
     {falsehood: id, comment: reason},
     {headers: this.tokenService.httpHeaders}).toPromise().catch((reason)=>{
      alert(reason.message || reason.error.message);
     });
  }

  async approvePublicFalsehood(app:boolean, id: number, reason: string) {
    await this.httpClient.put(environment.FALSEHOOD_URL + `Update/PublicFalsehood/${app ? 'Approve' : 'Reject'}`,
     {falsehood: id, comment: reason},
     {headers: this.tokenService.httpHeaders}).toPromise().catch((reason)=>{
      alert(reason.message || reason.error.message);
     });
  }

}
