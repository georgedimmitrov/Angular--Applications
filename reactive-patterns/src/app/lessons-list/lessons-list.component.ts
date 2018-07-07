import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Observer, store } from '../event-bus-experiments/app-data';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements Observer, OnInit {
  // used only to pass into template, but not directly modified
  lessons: Lesson[] = [];

  ngOnInit() {
    store.subscribe(this);
  }

  next(data: Lesson[]) {
    console.log('Lessons List component received data...');
    this.lessons = data;
  }

  toggleLessonViewed(lesson: Lesson) {
    store.toggleLessonViewed(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }

}
