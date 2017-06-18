import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { PunchcardService } from '../../shared/services/punchcard.service';
import { Data } from '../../shared/models/data.model';
import { ArcForm, ArcPublisher } from '../../shared/models/arc.model';

@Component({
  selector: 'arc-form',
  template: `
    <h3>ARC Campaign</h3>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="arc-form" *ngIf="data">

      <h4>Summary</h4>
      <arc-summary [parent]="form" [data]="data"></arc-summary>

      <h4>Publishers</h4>
      <div class="publishers">
        <button class="btn publishers__button--add" type="button" (click)="addPublisher()">Add Publisher</button>
        <arc-publishers [parent]="form" [data]="data" (removed)="removePublisher($event)"></arc-publishers>
      </div>

      <div class="summary-form__buttons">
        <button type="submit" [disabled]="form.invalid">Confirm</button>
      </div>

      <pre>{{ form.value | json }}</pre>

    </form>
  `,
  styleUrls: ['arc-form.component.scss']
})
export class ArcFormComponent implements OnInit {
  data: any;

  form = this.fb.group({
    summary: this.fb.group(new ArcForm()),
    publishers: this.fb.array([])
  });

  constructor(
    private service: PunchcardService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getDataList().subscribe(data => (this.data = data));
  }

  removePublisher(index: number) {
    const control = this.form.get('publishers') as FormArray;
    control.removeAt(index);
  }

  addPublisher() {
    const control = this.form.get('publishers') as FormArray;
    control.push(this.createPublisher());
  }

  createPublisher() {
    return this.fb.group(new ArcPublisher());
  }

  onSubmit() {
    this.form.get('summary').get('lastUpdated').setValue(this.datePipe.transform(Date.now(), 'y-MM-dd'));
    console.log('submit:', this.form.value);
  }
}
