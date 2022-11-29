import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { PercursoCriarComponent } from 'src/app/Componentes/Percurso/percurso-criar/percurso-criar.component';
import { Percurso } from 'src/app/Modelos/percurso';


@Injectable({
  providedIn: 'root'
})
export class PercursoService {


  constructor(
    private http: HttpClient) { }

    percursosURL: string = 'http://localhost:3000/api/percurso/';

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  /** GET Percursos from the server */
getPercursos(): Observable<Percurso[]> {
  return this.http.get<Percurso[]>(this.percursosURL+'listar')
    .pipe(
      catchError(this.handleError<Percurso[]>('getPercursos', []))
    );
}

/** GET Percurso by id. Will 404 if id not found */
getPercurso(id: string): Observable<Percurso> {
  const url = `${this.percursosURL}/${id}`;
  return this.http.get<Percurso>(url).pipe(
    catchError(this.handleError<Percurso>(`Percurso id=${id}`))
  );
}

/** PUT: update the Percurso on the server */
updatePercurso(percurso: Percurso): Observable<any> {
  return this.http.put(this.percursosURL+'update', percurso, this.httpOptions).pipe(
    catchError(this.handleError<Percurso>('updatePercurso'))
  );
}

/** POST: add a new Percurso to the server */
addPercurso(percurso: Percurso): Observable<Percurso> {
  return this.http.post<Percurso>(this.percursosURL+'inserir', percurso, this.httpOptions).pipe(
    catchError(this.handleError<Percurso>('addPercurso'))
  );
}

/** DELETE: delete the Percurso from the server */
deletePercurso(id: string): Observable<Percurso> {
  const url = `${this.percursosURL}/${id}`;

  return this.http.delete<Percurso>(url, this.httpOptions).pipe(
    catchError(this.handleError<Percurso>('deletePercurso'))
  );
}

/* GET heroes whose name contains search term */
searchPercurso(term: string): Observable<Percurso[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Percurso[]>(`${this.percursosURL}/?id=${term}`).pipe(
    catchError(this.handleError<Percurso[]>('searchCamiao', []))
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

