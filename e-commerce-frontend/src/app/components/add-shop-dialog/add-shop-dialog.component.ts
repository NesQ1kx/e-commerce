import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-add-shop-dialog',
  templateUrl: './add-shop-dialog.component.html',
  styleUrls: ['./add-shop-dialog.component.scss'],
})
export class AddShopDialogComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  private imageData = '';

  constructor(
    public dialogRef: MatDialogRef<AddShopDialogComponent>,
    private shopService: ShopService
  ) {}

  public ngOnInit(): void {
    this.form.get('image')?.valueChanges.subscribe((f) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
    });
  }

  public addShop() {
    this.shopService
      .addShop({
        name: this.form.get('name')?.value,
        link: this.form.get('link')?.value,
        image: this.imageData,
      })
      .toPromise()
      .then(() => this.close());
  }

  public close(): void {
    this.dialogRef.close();
  }
}
