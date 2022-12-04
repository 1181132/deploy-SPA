import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Armazem } from '../../Modelos/armazem';

@Injectable({
  providedIn: 'root'
})
export class ArmazemService {


  constructor(
    private http: HttpClient) { }

//private armazensUrl = 'api/armazens';  // URL to web api
private armazensUrl = 'https://localhost:5001/api/Armazens';  // URL to web api

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  /** GET Armazens from the server */
getArmazens(): Observable<Armazem[]> {
  return this.http.get<Armazem[]>(this.armazensUrl)
    .pipe(
      catchError(this.handleError<Armazem[]>('getArmazens', []))
    );
}

/** GET Armazem by id. Will 404 if id not found */
getArmazem(id: string): Observable<Armazem> {
  const url = `${this.armazensUrl}/${id}`;
  return this.http.get<Armazem>(url).pipe(
    catchError(this.handleError<Armazem>(`getArmazem id=${id}`))
  );
}

/** PUT: update the Armazem on the server */
updateArmazem(armazem: Armazem): Observable<any> {
  return this.http.put(this.armazensUrl, armazem.id, this.httpOptions).pipe(
    catchError(this.handleError<Armazem>('updateArmazem'))
  );
}

/** POST: add a new Armazem to the server */
addArmazem(armazem: Armazem): Observable<Armazem> {
  return this.http.post<Armazem>(this.armazensUrl, armazem, this.httpOptions).pipe(
    catchError(this.handleError<Armazem>('addArmazem'))
  );
}

/** DELETE: delete the Armazem from the server */
deleteArmazem(id: string): Observable<Armazem> {
  const url = `${this.armazensUrl}/${id}`;

  return this.http.delete<Armazem>(url, this.httpOptions).pipe(
    catchError(this.handleError<Armazem>('deleteArmazem'))
  );
}

/* GET heroes whose name contains search term */
searchArmazens(term: string): Observable<Armazem[]> {
  if (!term.trim()) {
    // if not search term, return empty armzem array.
    return of([]);
  }
  return this.http.get<Armazem[]>(`${this.armazensUrl}/?designacao=${term}`).pipe(
      catchError(this.handleError<Armazem[]>('searchArmazens', []))
  );
}


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}