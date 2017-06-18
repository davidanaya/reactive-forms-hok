import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { PunchcardService } from '../../shared/services/punchcard.service';
import { Data } from '../../shared/models/data.model';

@Component({
  selector: 'arc-summary',
  templateUrl: 'arc-summary.component.html',
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
