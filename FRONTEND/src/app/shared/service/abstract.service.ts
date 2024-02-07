import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AppConfig } from '../../app.config';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE'
}

@Injectable({
  providedIn: 'root'
})
export class AbstractService<T> implements HttpInterceptor {
  // to be overridden
  ROUTE: string;

  constructor(
    protected httpClient: HttpClient,
    private appConfig: AppConfig
  ) {
  }

  get(url: string, headers?: HttpHeaders): Observable<T> {
    this.before();
    return this.httpClient.get<T>(url, { headers })
      .pipe(finalize(this.finalize.bind(this)));
  }

  post(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    this.before();
    return this.httpClient.post<T>(url, body, { headers })
      .pipe(finalize(this.finalize.bind(this)));
  }

  put(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    this.before();
    return this.httpClient.put<T>(url, body, { headers })
      .pipe(finalize(this.finalize.bind(this)));
  }

  delete(url: string, headers?: HttpHeaders): Observable<T> {
    this.before();
    return this.httpClient.delete<T>(url, { headers })
      .pipe(finalize(this.finalize.bind(this)));
  }

  request<ANY>(method: HttpMethod, url: string, body?: any, headers?: HttpHeaders): Observable<ANY> {
    this.before();
    return this.httpClient.request<ANY>(method, url, {
      body,
      headers
    }).pipe(finalize(this.finalize.bind(this)));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      // Add token when requesting
      .handle(req.clone({
        responseType: 'json',
        setHeaders: {
          Authorization: this.appConfig.token || ''
        }
      }));
  }

  getEntity(id: string): Observable<T> {
    return this.get(`${this.ROUTE}/${id}`);
  }

  getEntities(): Observable<T[]> {
    return this.request(HttpMethod.GET, this.ROUTE);
  }

  insertEntity(entity: T): Observable<T> {
    return this.post(this.ROUTE, entity);
  }

  insertEntities(entities: T[] = []): Observable<T[]> {
    return this.request<T[]>(HttpMethod.POST, this.ROUTE, entities);
  }

  updateEntity(entity: T): Observable<T> {
    return this.put(this.ROUTE, entity);
  }

  updateEntities(entities: T[] = []): Observable<T[]> {
    return this.request<T[]>(HttpMethod.PUT, this.ROUTE, entities);
  }

  deleteEntity(id: string): Observable<T> {
    return this.delete(`${this.ROUTE}/${id}`);
  }

  deleteEntities(ids: string[] = []): Observable<T[]> {
    return this.request<T[]>(HttpMethod.DELETE, `${this.ROUTE}`, ids);
  }

  before(): void {
    this.appConfig.processing.setValue(true);
  }

  finalize(): void {
    this.appConfig.processing.setValue(false);
  }

}
