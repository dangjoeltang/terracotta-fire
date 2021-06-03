import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ClientService } from 'src/app/core/services/client/client.service';
import { Client } from 'src/app/shared/models/client.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  clientLookupInfo: Client;
  companyConfirmed = false;
  lookupFailed = false;

  constructor(private clientService: ClientService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    accountQuery: ['', Validators.required]
  })

  lookupAccount(querystring: string) {
    this.companyConfirmed = false;
    this.lookupFailed = false;
    delete this.clientLookupInfo;
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (querystring.match(emailRegex)) {
    } else {
      this.clientService.findClientByAccountNumberOrEmail(querystring)
        .subscribe((res: Client[]) => {
          this.lookupResReceived(res);
        })
    }
  }

  onConfirm(approval: boolean) {
    if (approval) {
      this.companyConfirmed = true;
    } else {
      this.companyConfirmed = false;
      this.registerForm.controls.accountQuery.reset();
    }
  }

  onReturnHome() {

  }

  onSendVerificationEmail() {

  }

  lookupResReceived(data: Client[]) {
    if (data.length > 0) {
      this.clientLookupInfo = data[0];
      // console.log(this.clientLookupInfo);
    } else {
      this.lookupFailed = true;
      // console.log(this.clientLookupInfo);
      // console.log(this.lookupFailed);
    }
  }
}
