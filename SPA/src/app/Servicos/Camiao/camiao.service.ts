import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Camiao } from '../../Modelos/camiao';

@Injectable({
  providedIn: 'root'
})
export class CamiaoService {


  constructor(
    private http: HttpClient) { }

    camiaoUrl: string = 'http://localhost:3000/api/camiao/'; // URL to web api

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  /** GET Armazens from the server */
getCamiaos(): Observable<Camiao[]> {
  return this.http.get<Camiao[]>(this.camiaoUrl+'listar')
    .pipe(
      catchError(this.handleError<Camiao[]>('getCamiaos', []))
    );
}

/** GET Camiao by id. Will 404 if id not found */
getCamiao(id: string): Observable<Camiao> {
  const url = `${this.camiaoUrl}/${id}`;
  return this.http.get<Camiao>(url).pipe(
    catchError(this.handleError<Camiao>(`getCamiao id=${id}`))
  );
}

/** PUT: update the Camiao on the server */
updateCamiao(camiao: Camiao): Observable<any> {
  return this.http.put(this.camiaoUrl+'update', camiao, this.httpOptions).pipe(
    catchError(this.handleError<Camiao>('updateCamiao'))
  );
}

/** POST: add a new Camiao to the server */
addCamiao(camiao: Camiao): Observable<Camiao> {
  return this.http.post<Camiao>(this.camiaoUrl+'inserir', camiao, this.httpOptions).pipe(
    catchError(this.handleError<Camiao>('addCamiao'))
  );
}

/** DELETE: delete the Camiao from the server */
deleteCamiao(id: string): Observable<Camiao> {
  const url = `${this.camiaoUrl}/${id}`;

  return this.http.delete<Camiao>(url, this.httpOptions).pipe(
    catchError(this.handleError<Camiao>('deleteCamiao'))
  );
}

/* GET heroes whose name contains search term */
searchCamiao(term: string): Observable<Camiao[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Camiao[]>(`${this.camiaoUrl}/?matricula=${term}`).pipe(
    catchError(this.handleError<Camiao[]>('searchCamiao', []))
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

