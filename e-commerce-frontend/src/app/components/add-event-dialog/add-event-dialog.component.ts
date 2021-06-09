import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EEventsTypes } from 'src/app/enums/events-types.enum';
import { IShop } from 'src/app/interfaces/shop.interface';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent implements OnInit, OnChanges {
  public destroyer$ = new Subject();
  public readonly selectOptions = [
    {
      type: EEventsTypes.promoCode,
      label: 'Промо код',
    },
    {
      type: EEventsTypes.sale,
      label: 'Скидка',
    },
    {
      type: EEventsTypes.cashback,
      label: 'Кэшбэк',
    },
  ];

  public selectedType: EEventsTypes = EEventsTypes.cashback;

  public shops: IShop[] = [];

  public form = new FormGroup({
    type: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    expiresIn: new FormControl(new Date(), [Validators.required]),
    shop: new FormControl('', [Validators.required]),
    saleAmount: new FormControl('') || undefined,
    code: new FormControl('') || undefined,
    cashbackAmount: new FormControl('') || undefined,
  });

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    public shopService: ShopService
  ) {
    this.form
      .get('type')
      ?.valueChanges.pipe(takeUntil(this.destroyer$))
      .subscribe((type) => {
        this.selectedType = type;
      });
  }

  public ngOnInit(): void {
    this.shopService.shops$
      .pipe(takeUntil(this.destroyer$))
      .subscribe((shops) => {
        this.shops = shops;
      });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public ngOnChanges(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
