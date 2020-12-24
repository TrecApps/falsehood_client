import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FalsehoodAppeal, FalsehoodAppealEntry } from 'src/app/models/appeal';
import { FullFalsehood } from 'src/app/models/falsehoods';
import { FullPublicFalsehood } from 'src/app/models/publicFalsehood';
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
  constructor() { 
    this.ClearNewAppeal();
    this.currentAppeal = null;
    this.desiredAppealId = new Number();
    this.attemptedSign = false;
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


    // Clean up
    this.ClearNewAppeal();
  }

  seekAppeal() {

    this.attemptedSign = false;
  }

  attemptSign() {



    this.attemptedSign = true;
  }

  attemptRatification() {
    
  }

}
