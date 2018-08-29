import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';


import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from '../models/reader';
import { Book } from '../models/book';
import { BookTrackerError } from '../models/bookTrackerError';

@Injectable()
export class DataService {
  mostPopularBook: Book = allBooks[0];

  constructor(
    private loggerService: LoggerService,
    private http: HttpClient
  ) { }

  getAuthorRecommendation(readerID: number): Promise<string> {
    // imagine some calculation is done here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (readerID > 0) {
          resolve('Dr. Seuss');
        } else {
          reject('Invalid reader ID');
        }
      }, 2000);
    });
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http
      .get<Reader[]>('/api/readers')
      .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse): Observable<BookTrackerError> {
    const dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return Observable.throw(dataError);
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }

}
