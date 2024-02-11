import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
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

const SILENT_CONTEXT: HttpContextToken<boolean> = new HttpContextToken<boolean>((): boolean => false);
const ERROR_IGNORE_CONTEXT: HttpContextToken<boolean> = new HttpContextToken<boolean>((): boolean => false);

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T> implements HttpInterceptor {
  // to be overridden
  abstract ROUTE: string;

  constructor(
    protected httpClient: HttpClient,
    private appConfig: AppConfig
  ) {
  }

  get(url: string, context?: { errorIgnore?: boolean, silent?: boolean, headers?: HttpHeaders }): Observable<T> {
    this.before();
    const httpContext: HttpContext = new HttpContext();
    httpContext.set(SILENT_CONTEXT, context?.silent);
    httpContext.set(ERROR_IGNORE_CONTEXT, context?.errorIgnore);
    return this.httpClient.get<T>(url, {
      headers: context?.headers,
      context: httpContext
    });
  }

  post(url: string, body: any, context?: {
    errorIgnore?: boolean,
    silent?: boolean,
    headers?: HttpHeaders
  }): Observable<T> {
    this.before();
    const httpContext: HttpContext = new HttpContext();
    httpContext.set(SILENT_CONTEXT, context?.silent);
    httpContext.set(ERROR_IGNORE_CONTEXT, context?.errorIgnore);
    return this.httpClient.post<T>(url, body, {
      headers: context?.headers,
      context: httpContext
    });
  }

  put(url: string, body: any, context?: {
    errorIgnore?: boolean,
    silent?: boolean,
    headers?: HttpHeaders
  }): Observable<T> {
    this.before();
    const httpContext: HttpContext = new HttpContext();
    httpContext.set(SILENT_CONTEXT, context?.silent);
    httpContext.set(ERROR_IGNORE_CONTEXT, context?.errorIgnore);
    return this.httpClient.put<T>(url, body, {
      headers: context?.headers,
      context: httpContext
    });
  }

  delete(url: string, context?: { errorIgnore?: boolean, silent?: boolean, headers?: HttpHeaders }): Observable<T> {
    this.before();
    const httpContext: HttpContext = new HttpContext();
    httpContext.set(SILENT_CONTEXT, context?.silent);
    httpContext.set(ERROR_IGNORE_CONTEXT, context?.errorIgnore);
    return this.httpClient.delete<T>(url, {
      headers: context?.headers,
      context: httpContext
    });
  }

  request<ANY>(method: HttpMethod, url: string, context?: {
    body?: any,
    errorIgnore?: boolean,
    silent?: boolean,
    headers?: HttpHeaders
  }): Observable<ANY> {
    this.before();
    const httpContext: HttpContext = new HttpContext();
    httpContext.set(SILENT_CONTEXT, context?.silent);
    httpContext.set(ERROR_IGNORE_CONTEXT, context?.errorIgnore);
    return this.httpClient.request<ANY>(method, url, {
      body: context?.body,
      headers: context?.headers,
      context: httpContext
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      // Add token when requesting
      .handle(req.clone({
        responseType: 'json',
        setHeaders: {
          Authorization: this.appConfig.token || ''
        }
      }))
      .pipe(catchError((err: HttpErrorResponse): Observable<any> => {
        const errorIgnore: boolean = req.context.get(ERROR_IGNORE_CONTEXT);
        return this.defaultHandler(err, errorIgnore);
      }))
      .pipe(finalize((): void => {
        if (!req.context.get(SILENT_CONTEXT)) {
          this.finalize();
        }
      }));
  }

  defaultHandler(error: HttpErrorResponse, errorIgnore?: boolean): Observable<any> {
    if (!errorIgnore) {

    }
    return throwError(() => error);
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
    return this.request<T[]>(HttpMethod.POST, this.ROUTE, {
      body: entities
    });
  }

  updateEntity(entity: T): Observable<T> {
    return this.put(this.ROUTE, entity);
  }

  updateEntities(entities: T[] = []): Observable<T[]> {
    return this.request<T[]>(HttpMethod.PUT, this.ROUTE, {
      body: entities
    });
  }

  deleteEntity(id: string): Observable<T> {
    return this.delete(`${this.ROUTE}/${id}`);
  }

  deleteEntities(ids: string[] = []): Observable<T[]> {
    return this.request<T[]>(HttpMethod.DELETE, `${this.ROUTE}`, {
      body: ids
    });
  }

  before(): void {
    this.appConfig.processing.setValue(true);
  }

  finalize(): void {
    this.appConfig.processing.setValue(false);
  }

}
