import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IShop } from 'src/app/interfaces/shop.interface';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit, OnDestroy {
  private destroyer$ = new Subject();
  public shops: IShop[] = [];

  constructor(private shopService: ShopService) {}

  public ngOnInit(): void {
    this.shopService.shops$
      .pipe(takeUntil(this.destroyer$))
      .subscribe((shops) => (this.shops = shops));
  }

  public ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
