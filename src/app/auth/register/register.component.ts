import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { MatVerticalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { ClientService } from 'src/app/core/services/client/client.service';
import { ContactService } from 'src/app/core/services/contact/contact.service';
import { Client } from 'src/app/shared/models/client.model';
import { Contact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  clientLookupInfo: Client;
  companyConfirmed = false;
  lookupFailed = false;
  private emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private contactService: ContactService, private clientService: ClientService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    accountQuery: ['', [
      Validators.required,
      // this.clientLookupValidator.bind(this)
    ]]
  })

  clientLookupValidator(control: AbstractControl): ValidationErrors | null {
    return this.companyConfirmed ? null : { 'companyUnconfirmed': true }
  }

  lookupAccount(querystring: string) {
    this.companyConfirmed = false;
    this.lookupFailed = false;
    delete this.clientLookupInfo;
    if (querystring.match(this.emailRegex)) {
      this.contactService.getContactsByEmail(querystring)
        .pipe(
          map((contacts: Contact[]) => contacts[0]),
          catchError((error: Error) => {
            this.lookupFailed = true;
            return throwError(new Error('No clients found associated with this email address'))
          })
        )
        .subscribe(
          (contact: Contact) => {
            console.log(contact);
            this.clientService.getClientOfContact(contact).subscribe(
              (client: Client) => {
                console.log(client);
                this.lookupResReceived(client);
              }
            ),
            error => {
              console.error(error);
              this.lookupFailed = true;
            }
          }
        ),
        error => {
          console.error(error);
          this.lookupFailed = true;
        }
    } else {
      this.clientService.findClientByAccountNumberOrEmail(querystring)
        .subscribe(
          (res: Client) => {
            this.lookupResReceived(res);
          }, 
          error => {
            console.log(error);
            this.lookupFailed = true;
          }
        )
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

  onStepperNext(stepper: MatVerticalStepper) {
    stepper.selected.completed = true;
    stepper.next();
    this.sendVerificationEmail();
  }

  sendVerificationEmail() {
    console.log('Verification email sent!');
  }

  lookupResReceived(data) {
    if (data) {
    // if (data.length > 0) {
      this.clientLookupInfo = data;
      // console.log(this.clientLookupInfo);
    } else {
      this.lookupFailed = true;
      // console.log(this.clientLookupInfo);
      // console.log(this.lookupFailed);
    }
  }
}
