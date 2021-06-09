import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isHidden = true;

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService) {}

  public getErrorMessage(key: string): string {
    const [value] = Object.keys(this.loginForm.get(key)?.errors ?? {});
    let msg = '';
    switch (value) {
      case 'required':
        msg = 'Обязательное поле';
        break;
      case 'email':
        msg = 'Неверный формат email';
        break;
    }

    return msg;
  }

  public submitLogin(): void {
    this.auth.login(this.loginForm.getRawValue()).toPromise();
  }
}
