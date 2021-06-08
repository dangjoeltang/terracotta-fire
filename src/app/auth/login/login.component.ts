import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginMethod = 'password'
  email: string;
  password: string;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  passwordLoginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  noPasswordLoginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
  }

  changeSigninMethod() {
    if (this.loginMethod === 'password') {
      this.loginMethod = 'otp';
    } else if (this.loginMethod === 'otp') {
      this.loginMethod = 'password';
    } else {
      console.error('Invalid signing method');
    }
  }

  onSubmitWithPassword() {
    this.email = this.passwordLoginForm.get('email').value;
    this.password = this.passwordLoginForm.get('password').value;
    this.userService.authenticate(this.email, this.password)
  }

  onSubmitPasswordless() {
    this.email = this.noPasswordLoginForm.get('email').value;
    this.userService.sendVerificationEmail(this.email);
  }

  onStepperNext(stepper: MatVerticalStepper) {
    stepper.selected.completed = true;
    stepper.next();
  }
}
