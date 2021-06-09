import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public post<T>(url: string, payload: object): Observable<HttpResponse<T>> {
    return this.http.post<T>(`${environment.hostUrl}${url}`, payload, {
      observe: 'response',
    });
  }

  public get<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${environment.hostUrl}${url}`, {
      observe: 'response',
    });
  }
}
