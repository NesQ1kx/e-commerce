import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private dialog: MatDialog
  ) {}

  public async addShop(): Promise<void> {
    const { AddShopDialogComponent } = await import(
      '../add-shop-dialog/add-shop-dialog.component'
    );

    this.dialog.open(AddShopDialogComponent, {
      width: '300px',
    });
  }

  public async addEvent(): Promise<void> {
    const { AddEventDialogComponent } = await import(
      '../add-event-dialog/add-event-dialog.component'
    );

    this.dialog.open(AddEventDialogComponent, {
      width: '500px',
    });
  }
}
