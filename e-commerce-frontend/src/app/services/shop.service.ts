import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICreateShop } from '../interfaces/create-shop.interface';
import { ApiService } from './api.service';
import * as HttpStatus from 'http-status-codes';
import { IShop } from '../interfaces/shop.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  public shops$ = new BehaviorSubject<IShop[]>([]);
  public get shops(): IShop[] {
    return this.shops$.getValue();
  }

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  public addShop(payload: ICreateShop): Observable<boolean> {
    return this.api.post<{ shop: IShop }>('shops/add', payload).pipe(
      tap((response) => {
        if (response.status === HttpStatus.CREATED && response.body?.shop) {
          this.shops$.next([...this.shops, response.body.shop]);
          this.snackBar.open('Успешно', 'x', {
            panelClass: 'snackbar-success',
            duration: 2000,
          });
        }
      }),
      map((response) => !(response instanceof HttpErrorResponse))
    );
  }

  public getAllShops(): Observable<boolean> {
    return this.api.get<{ shops: IShop[] }>('shops/all').pipe(
      tap((response) => {
        if (response.status === HttpStatus.OK) {
          this.shops$.next(response.body?.shops || []);
        }
      }),
      map((response) => !(response instanceof HttpErrorResponse))
    );
  }
}
