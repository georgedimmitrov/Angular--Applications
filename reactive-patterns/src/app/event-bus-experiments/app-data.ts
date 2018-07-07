import * as _ from 'lodash';

import { Lesson } from '../shared/model/lesson';

export interface Observer {
  next(data: any);
}

export interface Observable {
  subscribe(observer: Observer);
  unsubscribe(observer: Observer);
}

interface Subject extends Observer, Observable {
}

class SubjectImplementation implements Subject {
  private observers: Observer[] = [];

  next(data: any) {
    this.observers.forEach(obs => obs.next(data));
  }

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    _.remove(this.observers, el => el === observer);
  }
}

class DataStore implements Observable {
  // initial list of lessons - private (only 1 instance of it)
  private lessons: Lesson[] = [];

  private lessonsListSubject = new SubjectImplementation();

  subscribe(observer: Observer) {
    this.lessonsListSubject.subscribe(observer);
    observer.next(this.lessons);
  }

  unsubscribe(observer: Observer) {
    this.lessonsListSubject.unsubscribe(observer)
  }

  initializeLessonsList(newList: Lesson[]) {
    this.lessons = _.cloneDeep(newList);
    this.broadcast();
  }

  addLesson(newLesson: Lesson) {
    this.lessons.push(_.cloneDeep(newLesson));
    this.broadcast();
  }

  deleteLesson(deleted: Lesson) {
    _.remove(this.lessons,
        lesson => lesson.id === deleted.id);
    this.broadcast();
  }

  toggleLessonViewed(toggled: Lesson) {
    const lesson = _.find(this.lessons, lesson => lesson.id === toggled.id);

    lesson.completed = !lesson.completed;
    this.broadcast();
  }

  broadcast() {
    this.lessonsListSubject.next(_.cloneDeep(this.lessons));
  }
}

export const store = new DataStore();
