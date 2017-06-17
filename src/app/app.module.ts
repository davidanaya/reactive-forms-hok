import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { ArcFormComponent } from './containers/arc-form/arc-form.component';
import { ArcPublishersComponent } from './components/arc-publishers/arc-publishers.component';
import { ArcSummaryComponent } from './components/arc-summary/arc-summary.component';
import { PunchcardService } from './shared/services/punchcard.service';
import { ArcPublisherFormComponent } from './components/arc-publisher-form/arc-publisher-form.component';

@NgModule({
  imports: [BrowserModule, CommonModule, HttpModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ArcFormComponent,
    ArcSummaryComponent,
    ArcPublishersComponent,
    ArcPublisherFormComponent,
  ],
  providers: [PunchcardService, DatePipe]
})
export class AppModule {}
