import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public isHidden = true;

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService) {}

  public getErrorMessage(key: string): string {
    const [value] = Object.keys(this.signupForm.get(key)?.errors ?? {});
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

  public submitSignup(): void {
    this.auth.signup(this.signupForm.getRawValue()).toPromise();
  }
}
