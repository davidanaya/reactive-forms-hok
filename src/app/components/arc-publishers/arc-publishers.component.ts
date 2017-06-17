import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'arc-publishers',
  template: `
    <div [formGroup]="parent">
      <div class="publishers" formArrayName="publishers">
        <div *ngFor="let item of publishers; let i = index;">

          <!--arc-publisher [parent]="parent" [data]="data" [index]="i"></arc-publisher-->

        </div>
      </div>
    </div>
  `,
  styleUrls: ['arc-publishers.component.scss']
})
export class ArcPublishersComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() data: any;

  constructor() {}

  ngOnInit() {
  }

  get publishers() {
    return (this.parent.get('publishers') as FormArray).controls;
  }
}
