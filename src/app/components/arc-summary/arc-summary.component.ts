import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { PunchcardService } from '../../shared/services/punchcard.service';
import { Data } from '../../shared/models/data.model';

@Component({
  selector: 'arc-summary',
  template: `
    <div [formGroup]="parent">
      <div class="summary__columns" formGroupName="summary">
        <div class="summary__column--left">
          <select formControlName="client">
            <option value="">Client</option>
            <option *ngFor="let item of data.clients" [value]="item.value">{{ item.value }}</option>
          </select>
          <input type="text" formControlName="clientCode" placeholder="Client Code"/>
          <input type="text" formControlName="clientLead" placeholder="Client Lead">
          <input type="text" formControlName="hokAccountLead" placeholder="HOK Account Lead">
          <input type="text" formControlName="hokMediaLead" placeholder="HOK Media Lead">
          <select formControlName="primaryConversionGoal">
            <option value="">Primary Conversion Goal</option>
            <option *ngFor="let item of data.convgoal" [value]="item.value">{{ item.value }}</option>
          </select>
          <select formControlName="secondaryConversionGoal">
            <option value="">Secondary Conversion Goal</option>
            <option *ngFor="let item of data.convgoal" [value]="item.value">{{ item.value }}</option>
          </select>
          <select formControlName="clickCookieWindow">
            <option value="">Click Cookie Window</option>
            <option *ngFor="let item of data.cookie" [value]="item.value">{{ item.value }}</option>
          </select>
          <select formControlName="impressionCookieWindow">
            <option value="">Impression Cookie Window</option>
            <option *ngFor="let item of data.cookie" [value]="item.value">{{ item.value }}</option>
          </select>
        </div>

        <div class="summary__column--right">
          <input type="text" formControlName="totalActualBudget" placeholder="Total Actual Budget">
          <input type="text" formControlName="plannedInvestment" placeholder="Planned Investment">
          <input type="text" formControlName="contingency" placeholder="Contingency">
          <input type="date" formControlName="startDate" placeholder="Start Date">
          <input type="date" formControlName="endDate" placeholder="End Date">
          <select formControlName="country">
            <option value="">Country</option>
            <option *ngFor="let item of data.geo" [value]="item.value">{{ item.value }}</option>
          </select>
          <select formControlName="currency">
            <option value="">Currency</option>
            <option *ngFor="let item of data.currency" [value]="item.value">{{ item.value }}</option>
          </select>
          <select formControlName="bau">
            <option value="">BAU or Special Project</option>
            <option *ngFor="let item of data.inputBusType" [value]="item.value">{{ item.value }}</option>
          </select>
          <input type="date" formControlName="lastUpdated" placeholder="Last Updated">
        </div>
      </div>
    </div>
  `,
  styleUrls: ['arc-summary.component.scss']
})
export class ArcSummaryComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() data: any;

  summary: FormGroup;
  clientsMap: Map<string, string>;

  constructor() {}

  ngOnInit() {
    this.summary = this.parent.get('summary') as FormGroup;

    this.generateMaps();
    this.setFormulas();
  }

  private generateMaps() {
    const myMap = (this.data.clients as Data[]).map<[string, string]>(val => [
      val.value,
      val.bar
    ]);
    this.clientsMap = new Map<string, string>(myMap);
  }

  private setFormulas() {
    // clientCode
    this.summary
      .get('client')
      .valueChanges.map(val => this.clientsMap.get(val))
      .subscribe(code => this.setClientCode(code));

    // contingency
    this.summary
      .get('totalActualBudget')
      .valueChanges
      .subscribe(val => this.setContingency());

    this.summary
      .get('plannedInvestment')
      .valueChanges
      .subscribe(val => this.setContingency());
  }

  private setClientCode(value: string) {
    this.summary.get('clientCode').setValue(value);
  }

  private setContingency() {
    const budget = Number(this.summary.get('totalActualBudget').value);
    const investment = Number(this.summary.get('plannedInvestment').value);
    this.summary.get('contingency').setValue(budget - investment);
  }
}
