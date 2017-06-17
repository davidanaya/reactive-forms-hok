import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'arc-publisher-form',
  template: `
    <div class="publisher" [formArrayName]="parent">

      <button class="btn publisher__button--remove" type="button" (click)="onRemove(index)">Remove</button>

      <div class="publisher__fields">
        <select formControlName="publisher">
          <option value="">Publisher/Partner</option>
          <option *ngFor="let item of data.publishers" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="producta">
          <option value="">Efficiency Metric</option>
          <option *ngFor="let item of data.producta" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="targetinga">
          <option value="">Activity</option>
          <option *ngFor="let item of data.targetinga" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="targetingb">
          <option value="">Targeting B</option>
          <option *ngFor="let item of data.targetingb" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="campaign">
          <option value="">Campaign</option>
          <option *ngFor="let item of data.campaign" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="geoTarget">
          <option value="">Geo Target</option>
          <option *ngFor="let item of data.geo" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="pickup">
          <option value="">Pickup</option>
          <option *ngFor="let item of data.geo" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="productb">
          <option value="">Advertiser</option>
          <option *ngFor="let item of data.productb" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="productc">
          <option value="">DSP</option>
          <option *ngFor="let item of data.productc" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="funding">
          <option value="">Secondary Efficiency Metric</option>
          <option *ngFor="let item of data.funding" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="channel">
          <option value="">Channel</option>
          <option *ngFor="let item of data.channel" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="platform">
          <option value="">Device</option>
          <option *ngFor="let item of data.platform" [value]="item.value">{{ item.value }}</option>
        </select>
        <input type="date" formControlName="startDate" placeholder="Start">
        <input type="date" formControlName="endDate" placeholder="End">
        <input type="text" formControlName="totalDays" placeholder="Total Days">
        <select formControlName="rate">
          <option value="">Rate Type</option>
          <option *ngFor="let item of data.rate" [value]="item.value">{{ item.value }}</option>
        </select>
        <select formControlName="tradingModel">
          <option value="">Trading Model</option>
          <option *ngFor="let item of data.tradingModel" [value]="item.value">{{ item.value }}</option>
        </select>
        <input type="text" formControlName="netRate" placeholder="Net Rate">
        <input type="text" formControlName="campaingBudget" placeholder="Campaign Budget">
        <select formControlName="ioRegion">
          <option value="">IO Region</option>
          <option *ngFor="let item of data.geo" [value]="item.value">{{ item.value }}</option>
        </select>
        <input type="text" formControlName="ioLi" placeholder="IO/LI">
        <input type="text" formControlName="xRate" placeholder="xRate">
        <input type="text" formControlName="marginPerc" placeholder="Margin %">
        <input type="text" formControlName="plannedRevenue" placeholder="Planned Revenue">
        <input type="text" formControlName="campaignBudget$" placeholder="Campaign Budget $">
        <input type="text" formControlName="margin$" placeholder="Margin $">
        <input type="text" formControlName="totalBudget$" placeholder="Total Budget $">
        <input type="text" formControlName="fees" placeholder="Fees">
        <input type="text" formControlName="totalInvestment" placeholder="Total Investment">
        <input type="text" formControlName="ctr" placeholder="CTR">
        <input type="text" formControlName="plannedConversions" placeholder="Planned Conversions">
        <input type="text" formControlName="totalImpressions" placeholder="Total Impressions">
        <input type="text" formControlName="totalClicks" placeholder="Total Clicks">
        <input type="text" formControlName="conversions" placeholder="Conversions">
        <input type="text" formControlName="mediaCpaGoal" placeholder="Media CPA Goal">
        <input type="text" formControlName="clientCpaGoal" placeholder="Client CPA Goal">
        <input type="text" formControlName="dailySpend" placeholder="Daily Spend">
        <input type="text" formControlName="totalRevenue" placeholder="Total Revenue">
        <input type="text" formControlName="cosPercLimit" placeholder="COS % Limit">
        <input type="text" formControlName="roiPercLimit" placeholder="ROI % Limit">
      </div>
      
    </div>
  `
})
export class ArcPublisherFormComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() data: any;
  @Input() index: number;

  @Output() removed = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    console.log(this.parent, this.index);
    var a = moment([2007, 0, 29]);
    var b = moment([2007, 0, 28]);
    //console.log(a.diff(b, 'days'));
  }

  onRemove(index: number) {
    this.removed.emit(index);
  }
}
