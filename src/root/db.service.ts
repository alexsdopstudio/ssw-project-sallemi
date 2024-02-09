import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private dbEndPoint: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';
  private key: string = '0b5006f1';

  private getData(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.dbEndPoint + 'get?key=' + this.key,
      crossDomain: true,
    });
  }

  private setData(archive: Book[]): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'POST',
      url: this.dbEndPoint + 'set?key=' + this.key,
      body: archive,
      headers: {
        'Content-Type': 'application/json',
      },
      crossDomain: true,
    });
  }

  public addBook(book: Book): Observable<AjaxResponse<any>> {
    return this.getData().pipe(
      switchMap((data) => {
        let db: Book[] = JSON.parse(data.response);
        db.push(book);
        return this.setData(db);
      })
    );
  }

  public deleteBook(book: Book): Observable<AjaxResponse<any>> {
    return this.getData().pipe(
      switchMap((data) => {
        let db: Book[] = JSON.parse(data.response);
        let newDb: Book[] = db.filter((item: Book) => item.id !== book.id);
        return this.setData(newDb);
      })
    );
  }

  public loanBook(book: Book, user: string): Observable<AjaxResponse<any>> {
    return this.getData().pipe(
      switchMap((data) => {
        book.user = user;
        let db: Book[] = JSON.parse(data.response);
        let newDb: Book[] = db.map((item) =>
          item.id === book.id ? book : item
        );
        return this.setData(newDb);
      })
    );
  }

  public returnBook(book: Book): Observable<AjaxResponse<any>> {
    return this.getData().pipe(
      switchMap((data) => {
        book.user = '';
        let db: Book[] = JSON.parse(data.response);
        let newDb = db.map((item) => (item.id === book.id ? book : item));
        return this.setData(newDb);
      })
    );
  }

  public searchBook(query: string): Observable<Book[]> {
    return this.getData().pipe(
      switchMap((data) => {
        let db: Book[] = JSON.parse(data.response);
        return of(
          db.filter(
            (book) =>
              book.title.toLowerCase().includes(query.toLowerCase()) ||
              book.author.toLowerCase().includes(query.toLowerCase())
          )
        );
      })
    );
  }
  constructor() {}
}
