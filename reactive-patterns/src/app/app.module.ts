import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EventBusExperimentsComponent } from './event-bus-experiments/event-bus-experiments.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { LessonsCounterComponent } from './lessons-counter/lessons-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    EventBusExperimentsComponent,
    LessonsListComponent,
    LessonsCounterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
