import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <arc-form></arc-form>
  `,
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor() {}
}
