import { Injectable } from '@angular/core';
import { Question } from '../models/Question';

@Injectable()
export class DataService {
  questions: Question[];

  constructor() {
    // old hardcoded way
    // this.questions = [
    //   {
    //     text: 'What is your name?',
    //     answer: 'My name is B!',
    //     hide: true
    //   },
    //   {
    //     text: 'What is your favourite colour?',
    //     answer: 'My favourite color is blue.',
    //     hide: true
    //   },
    //   {
    //     text: 'What is your favourite language?',
    //     answer: 'My favourite language is JS.',
    //     hide: true
    //   }
    // ];
  }

  // Get Questions from Local Storage
  getQuestions() {
    const questionsLocalStorage = localStorage.getItem('questions');

    if (!questionsLocalStorage) {
      this.questions = [];
    } else {
      this.questions = JSON.parse(questionsLocalStorage);
    }

    return this.questions;
  }

  // Add Question to Local Storage
  addQuestion(question: Question) {
    this.questions.unshift(question);

    const questionsLocalStorage = localStorage.getItem('questions');
    let questions;

    if (!questionsLocalStorage) {
      questions = [];

      // push new question - only item so no point of unshifting
      questions.push(question);

      // set new array to Local Storage
      localStorage.setItem('questions', JSON.stringify(questions));
    } else {
      questions = JSON.parse(questionsLocalStorage);

      // unshift new question on first position
      questions.unshift(question);

      // Reset new array to Local Storage
      localStorage.setItem('questions', JSON.stringify(questions));
    }
  }

  // Remove Question from Local Storage
  removeQuestion(question: Question) {
    for (let i = 0; i < this.questions.length; i++) {
      if (question === this.questions[i]) {
        this.questions.splice(i, 1);

        // Reset new array to Local Storage
        localStorage.setItem('questions', JSON.stringify(this.questions));
      }
    }
  }
}
