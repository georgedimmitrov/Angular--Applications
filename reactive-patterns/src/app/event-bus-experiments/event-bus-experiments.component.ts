import { Component, OnInit } from '@angular/core';

import { store } from './app-data';
import { testLessons } from '../shared/model/test-lessons';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  ngOnInit() {
    console.log('Top level component broadcast all lessons...');
    store.initializeLessonsList(testLessons.slice(0));

    setTimeout(() => {
      const newLesson = {
        id: Math.random(),
        description: 'New Lesson Arriving From Back-end'
      };

      store.addLesson(newLesson);
    }, 10000);
  }

  addLesson(lessonText: string) {
    const newLesson = {
      id: Math.random(),
      description: lessonText
    };

    store.addLesson(newLesson);
  }

}
