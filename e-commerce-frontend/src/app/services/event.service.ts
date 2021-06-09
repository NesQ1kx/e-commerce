import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IEvent } from '../interfaces/event.interface';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private readonly api: ApiService) {}

  public addEvent(payload: Omit<IEvent, '_id'>): Observable<boolean> {
    return this.api.post<{ event: IEvent }>('events/add', payload).pipe(
      tap((response) => {}),
      map((res) => !(res instanceof HttpErrorResponse))
    );
  }
}
