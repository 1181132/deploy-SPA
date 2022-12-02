import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Entrega } from 'src/app/Modelos/entrega';

@Injectable({
  providedIn: 'root'
})

export class EntregaService {

  constructor(private http: HttpClient) { }

  private entregasUrl = 'https://localhost:5001/api/Entregas';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    /** GET Entregas from the server */
getEntregas(): Observable<Entrega[]> {
  return this.http.get<Entrega[]>(this.entregasUrl)
    .pipe(
      catchError(this.handleError<Entrega[]>('getEntregas', []))
    );
}

/** GET Entrega by id. Will 404 if id not found */
getEntrega(id: string): Observable<Entrega> {
  const url = `${this.entregasUrl}/${id}`;
  return this.http.get<Entrega>(url).pipe(
    catchError(this.handleError<Entrega>(`getEntrega id=${id}`))
  );
}

/** PUT: update the Entrega on the server */
updateEntrega(entrega: Entrega): Observable<any> {
  return this.http.put(this.entregasUrl, entrega, this.httpOptions).pipe(
    catchError(this.handleError<Entrega>('updateArmazem'))
  );
}

/** POST: add a new Entrega to the server */
addEntrega(entrega: Entrega): Observable<Entrega> {
  return this.http.post<Entrega>(this.entregasUrl, entrega, this.httpOptions).pipe(
    catchError(this.handleError<Entrega>('addEntrega'))
  );
}

/** DELETE: delete the Entrega from the server */
deleteEntrega(id: string): Observable<Entrega> {
  const url = `${this.entregasUrl}/${id}`;

  return this.http.delete<Entrega>(url, this.httpOptions).pipe(
    catchError(this.handleError<Entrega>('deleteEntrega'))
  );
}

/* GET entregas whose name contains search term */
searchEntregas(term: string): Observable<Entrega[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Entrega[]>(`${this.entregasUrl}/?id=${term}`).pipe(
    catchError(this.handleError<Entrega[]>('searchEntregas', []))
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
