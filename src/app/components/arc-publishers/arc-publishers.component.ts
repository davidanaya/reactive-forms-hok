import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import * as moment from 'moment';

import { ArcPublisher } from '../../shared/models/arc.model';

@Component({
  selector: 'arc-publishers',
  templateUrl: './arc-publishers.component.html',
  styleUrls: ['./arc-publishers.component.scss']
})
export class ArcPublishersComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() data: any;

  @Output() removed = new EventEmitter<number>();

  totalPublishers: number = 0;

  constructor() {}

  ngOnInit() {
    (this.parent.get('publishers') as FormArray).valueChanges
      .map((publishers: ArcPublisher[]) => {
        if (this.totalPublishers === publishers.length) {
          publishers.forEach((publisher, index) => {
            this.updatePublisher((this.parent.get('publishers') as FormArray).get([index]) as FormGroup);
          });
        } else {
          this.totalPublishers = publishers.length;
        }
      })
      .subscribe();
  }

  get publishers() {
    return (this.parent.get('publishers') as FormArray).controls;
  }

  private updatePublisher(publisher: FormGroup) {
    this.updateTotalDays(publisher);
    this.updateCampaignBudget(publisher);
    this.updateCampaignBudget$(publisher);
    this.updateMargin$(publisher);
    this.updateTotalBudget$(publisher);
    this.updateFees(publisher);
    this.updateTotalInvestment(publisher);
    this.updateTotalImpressions(publisher);
    this.updateTotalClicks(publisher);
    this.updateConversions(publisher);
    this.updateMediaCpaGoal(publisher);
    this.updateClientCpaGoal(publisher);
    this.updateDailySpend(publisher);
    this.updateTotalRevenue(publisher);
    this.updateCosPercLimit(publisher);
    this.updateRoiPercLimit(publisher);
  }

  private updateTotalDays(publisher: FormGroup) {
    const format = 'YYYY-MM-DD';
    const sDate = publisher.get('startDate').value;
    const eDate = publisher.get('endDate').value;
    if (this.validValues(sDate, eDate)) {
      const days = moment(eDate, format).diff(moment(sDate, format), 'days');
      this.updateValue(days, 'totalDays', publisher);
    }
  }

  private updateCampaignBudget(publisher: FormGroup) {
    const clientBudget = publisher.get('clientBudget').value;
    const marginPerc = publisher.get('marginPerc').value;
    if (this.validValues(clientBudget, marginPerc)) {
      const campaignBudget = (1 - marginPerc) * clientBudget;
      this.updateValue(campaignBudget, 'campaignBudget', publisher);
    }
  }

  private updateCampaignBudget$(publisher: FormGroup) {
    const campaignBudget = publisher.get('campaignBudget').value;
    const xRate = publisher.get('xRate').value;
    if (this.validValues(campaignBudget, xRate)) {
      const campaignBudget$ = campaignBudget / xRate;
      this.updateValue(campaignBudget$, 'campaignBudget$', publisher);
    }
  }

  private updateMargin$(publisher: FormGroup) {
    const clientBudget = publisher.get('campaignBudget').value;
    const campaignBudget = publisher.get('campaignBudget').value;
    const xRate = publisher.get('xRate').value;
    if (this.validValues(xRate, clientBudget, campaignBudget)) {
      const margin$ = (clientBudget - campaignBudget) / xRate;
      this.updateValue(margin$, 'margin$', publisher);
    }
  }

  private updateTotalBudget$(publisher: FormGroup) {
    const clientBudget = publisher.get('campaignBudget').value;
    const xRate = publisher.get('xRate').value;
    if (this.validValues(xRate, clientBudget)) {
      const totalBudget$ = clientBudget / xRate;
      this.updateValue(totalBudget$, 'totalBudget$', publisher);
    }
  }

  private updateFees(publisher: FormGroup) {
    const margin$ = publisher.get('margin$').value;
    const campaignBudget$ = publisher.get('campaignBudget$').value;
    const totalBudget$ = publisher.get('totalBudget$').value;
    if (this.validValues(margin$, campaignBudget$, totalBudget$)) {
      const fees = margin$ + campaignBudget$ + totalBudget$;
      this.updateValue(fees, 'fees', publisher);
    }
  }

  private updateTotalInvestment(publisher: FormGroup) {
    const margin$ = publisher.get('margin$').value;
    const campaignBudget$ = publisher.get('campaignBudget$').value;
    const totalBudget$ = publisher.get('totalBudget$').value;
    const plannedRevenue = publisher.get('plannedRevenue').value;
    const clientBudget = publisher.get('campaignBudget').value;
    if (this.validValues(margin$, campaignBudget$, totalBudget$, plannedRevenue, clientBudget)) {
      const totalInvestment = margin$ + campaignBudget$ + totalBudget$ + plannedRevenue + clientBudget;
      this.updateValue(totalInvestment, 'totalInvestment', publisher);
    }
  }

  private updateTotalImpressions(publisher: FormGroup) {
    const rate = publisher.get('rate').value;
    let totalImpressions;
    switch (rate) {
      case 'CPM':
        const clientBudget = publisher.get('campaignBudget').value;
        const netRate = publisher.get('netRate').value;
        if (this.validValues(clientBudget, netRate)) {
          totalImpressions = (1000 * clientBudget) / netRate;
        }
        break;
      case 'CPC':
        const totalClicks = publisher.get('totalClicks').value;
        const ctr = publisher.get('ctr').value;
        if (this.validValues(totalClicks, ctr)) {
          totalImpressions = totalClicks / ctr;
        }
        break;
      case 'CPA':
        const mediaCpaGoal = publisher.get('mediaCpaGoal').value;
        const plannedConversions = publisher.get('plannedConversions').value;
        if (this.validValues(mediaCpaGoal, plannedConversions)) {
          totalImpressions = mediaCpaGoal * plannedConversions;
        }
        break;
    }
    if (totalImpressions) {
      this.updateValue(totalImpressions, 'totalImpressions', publisher);
    }
  }

  private updateTotalClicks(publisher: FormGroup) {
    const rate = publisher.get('rate').value;
    let totalClicks;
    switch (rate) {
      case 'CPC':
        const clientBudget = publisher.get('campaignBudget').value;
        const netRate = publisher.get('netRate').value;
        if (this.validValues(clientBudget, netRate)) {
          totalClicks = clientBudget / netRate;
        }
        break;
      case 'CPA':
      case 'CPM':
        const totalImpressions = publisher.get('totalImpressions').value;
        const ctr = publisher.get('ctr').value;
        if (this.validValues(totalImpressions, ctr)) {
          totalClicks = totalImpressions * ctr;
        }
        break;
    }
    if (totalClicks) {
      this.updateValue(totalClicks, 'totalClicks', publisher);
    }
  }

  updateConversions(publisher) {
    const plannedConversions = publisher.get('plannedConversions').value;
    if (this.validValues(plannedConversions)) {
      this.updateValue(plannedConversions, 'conversions', publisher);
    }
  }
  
  updateMediaCpaGoal(publisher) {
    const campaignBudget = publisher.get('campaignBudget').value;
    const plannedConversions = publisher.get('plannedConversions').value;
    if (this.validValues(campaignBudget, plannedConversions)) {
      const mediaCpaGoal = campaignBudget / plannedConversions;
      this.updateValue(mediaCpaGoal, 'mediaCpaGoal', publisher);
    }
  }    
    
  updateClientCpaGoal(publisher) {
    const clientBudget = publisher.get('clientBudget').value;
    const conversions = publisher.get('conversions').value;
    if (this.validValues(clientBudget, conversions)) {
      const clientCpaGoal = clientBudget / conversions;
      this.updateValue(clientCpaGoal, 'clientCpaGoal', publisher);
    }
  }
  
  updateDailySpend(publisher) {
    const clientBudget = publisher.get('clientBudget').value;
    const totalDays = publisher.get('totalDays').value;
    if (this.validValues(clientBudget, totalDays)) {
      const dailySpend = clientBudget / totalDays;
      this.updateValue(dailySpend, 'dailySpend', publisher);
    }
  }    
  
  updateTotalRevenue(publisher) {
    const plannedRevenue = publisher.get('plannedRevenue').value;
    if (this.validValues(plannedRevenue)) {
      this.updateValue(plannedRevenue, 'totalRevenue', publisher);
    }
  }    
  
  updateCosPercLimit(publisher) {
    const clientBudget = publisher.get('clientBudget').value;
    const plannedRevenue = publisher.get('plannedRevenue').value;
    if (this.validValues(clientBudget, plannedRevenue)) {
      const cosPercLimit = clientBudget / plannedRevenue;
      this.updateValue(cosPercLimit, 'cosPercLimit', publisher);
    }
  }    
  
  updateRoiPercLimit(publisher) {
    const clientBudget = publisher.get('clientBudget').value;
    const plannedRevenue = publisher.get('plannedRevenue').value;
    if (this.validValues(clientBudget, plannedRevenue)) {
      const roiPercLimit = (plannedRevenue - clientBudget) / clientBudget;
      this.updateValue(roiPercLimit, 'roiPercLimit', publisher);
    }
  }

  private updateValue(value: any, name: string, publisher: FormGroup) {
    const prev = publisher.get(name).value;
    if (value !== prev) {
      publisher.get(name).setValue(value, { emitEvent: true });
    }
  }

  private validValues(...values: number[]): boolean {
    return !values.some(val => !val && val !== 0);
  }

  onRemove(index: number) {
    this.removed.emit(index);
  }
}
