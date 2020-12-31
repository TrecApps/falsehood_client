import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FalsehoodAppeal, FalsehoodAppealEntry, FalsehoodAppealSignature } from 'src/app/models/appeal';
import { FullFalsehood } from 'src/app/models/falsehoods';
import { FullPublicFalsehood } from 'src/app/models/publicFalsehood';
import { SearchService } from 'src/app/services/search.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { FalsehoodSearchComponent } from '../falsehood-search/falsehood-search.component';
import { PublicFalsehoodSearchComponent } from '../public-falsehood-search/public-falsehood-search.component';

@Component({
  selector: 'app-appeal-component',
  templateUrl: './appeal.component.html',
  styleUrls: ['./appeal.component.css']
})
export class AppealComponent implements OnInit, OnChanges  {

  appealMode: number;
  selectMode: number;

  medFalsehood: FullFalsehood;
  pubFalsehood: FullPublicFalsehood;

  // Resources for creating Appeal
  reason: string;
  desiredState: string;

  // Resources for an appeal
  currentAppeal: FalsehoodAppealEntry;
  desiredAppealId: Number;
  attemptedSign: boolean;
  validationCode: String;

  @ViewChild(PublicFalsehoodSearchComponent) searchPubComponent: PublicFalsehoodSearchComponent;
  @ViewChild(FalsehoodSearchComponent) searchMedComponent: FalsehoodSearchComponent;


  constructor(private client: HttpClient, private tokenService: TokenService, private search: SearchService) { 
    this.ClearNewAppeal();
    this.currentAppeal = null;
    this.desiredAppealId = new Number();
    this.attemptedSign = false;

    this.searchMedComponent = new FalsehoodSearchComponent(search);
    this.searchPubComponent = new PublicFalsehoodSearchComponent(search);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

  ngDoCheck() {

  }

  ngOnInit(): void {
  }

  setAppealMode(appealMode: number) {
    this.appealMode = appealMode;
    this.attemptedSign = false;
  }

  ClearNewAppeal() {
    this.appealMode = this.selectMode = 0;
    this.medFalsehood = null;
    this.pubFalsehood = null;
  }

  SelectMediaFalsehood() {
    this.selectMode = 1;
  }

  SelectPublicFalsehood() {
    this.selectMode = 2;
    this.attemptedSign = false;
  }

  submitAppeal() {
    let appeal = new FalsehoodAppeal();
    if(this.searchMedComponent.falsehood) {
      appeal.falsehood = this.searchMedComponent.falsehood.metadata;
    } else {
      appeal.pFalsehood = this.searchPubComponent.falsehood.metadata;
    }

    appeal.desiredState = this.desiredState;
    appeal.id = null;

    let fullAppeal = new FalsehoodAppealEntry();
    fullAppeal.appeal = appeal;
    fullAppeal.reason = this.reason;

    // To-Do: Make call
    this.client.post(environment.FALSEHOOD_URL + "Appeal/Add", fullAppeal, {headers: this.tokenService.httpHeaders}).
      toPromise().catch((reason) =>{
        console.log(reason);
        alert(reason.message || reason.error.message);
      });

    // Clean up
    this.ClearNewAppeal();
  }

  seekAppeal() {

    this.client.get(environment.FALSEHOOD_URL + `entry&id=${this.desiredAppealId}`).
      toPromise().then((entry: FalsehoodAppealEntry) => {
        this.currentAppeal = entry;
      }).catch((reason) =>{
        console.log(reason);
        alert(reason.message || reason.error.message);
      });

    this.attemptedSign = false;
  }

  signature: FalsehoodAppealSignature;

  attemptSign() {
    this.client.post(environment.FALSEHOOD_URL + "Petition", { "appeal" : this.currentAppeal},
    {headers: this.tokenService.httpHeaders})
    .toPromise().then((entry: FalsehoodAppealSignature) => {
      this.signature = entry;
    }).catch((reason) =>{
      console.log(reason);
      alert(reason.message || reason.error.message);
    });


    this.attemptedSign = true;
  }

  attemptRatification() {

    let headers = new HttpHeaders({
      "Content-Type" : "application/x-www-form-urlencoded",
      "Authorization" : this.tokenService.httpHeaders.get("Authorization")
    });

    this.client.put(environment.FALSEHOOD_URL + "Petition",
     {"appealId": this.signature.id, "validation": this.validationCode},{headers}).
     toPromise().then(()=> {
       alert("Petition Signed!");
       this.attemptedSign = false;
     }).catch((reason) => {
      alert(reason.message || reason.error.message);
      this.attemptedSign = false;
     })
  }

}
