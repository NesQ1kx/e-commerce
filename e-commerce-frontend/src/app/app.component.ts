import { Component, OnInit } from '@angular/core';
import { ShopService } from './services/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'e-commerce';

  constructor(private shopService: ShopService) {}

  public ngOnInit(): void {
    this.shopService.getAllShops().toPromise();
  }
}
