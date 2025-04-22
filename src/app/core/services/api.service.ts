import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }
  
  /**
   * Perform a GET request to the API
   */
  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { params })
      .pipe(catchError(this.handleError));
  }
  
  /**
   * Perform a POST request to the API
   */
  post<T>(path: string, body: any, headers: HttpHeaders = new HttpHeaders()): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body, { headers })
      .pipe(catchError(this.handleError));
  }
  
  /**
   * Perform a PUT request to the API
   */
  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${path}`, body)
      .pipe(catchError(this.handleError));
  }
  
  /**
   * Perform a DELETE request to the API
   */
  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}`)
      .pipe(catchError(this.handleError));
  }
  
  /**
   * Handle any errors from the API
   */
  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(() => error);
  }
} 