import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { MatVerticalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { ClientService } from 'src/app/core/services/client/client.service';
import { ContactService } from 'src/app/core/services/contact/contact.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Client } from 'src/app/shared/models/client.model';
import { Contact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  client: Client;
  contact: Contact;
  companyConfirmed = false;
  lookupFailed = false;
  private emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private contactService: ContactService, private clientService: ClientService, private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    accountQuery: ['', [
      Validators.required,
      Validators.email
      // this.clientLookupValidator.bind(this)
    ]]
  })

  clientLookupValidator(control: AbstractControl): ValidationErrors | null {
    return this.companyConfirmed ? null : { 'companyUnconfirmed': true }
  }

  lookupAccount(querystring: string) {
    this.companyConfirmed = false;
    this.lookupFailed = false;
    delete this.client;
    if (querystring.match(this.emailRegex)) {
      this.contactService.getContactsByEmail(querystring)
        .pipe(
          take(1),
          map((contacts: Contact[]) => contacts[0]),
          catchError((error: Error) => {
            this.lookupFailed = true;

            return throwError(new Error('No clients found associated with this email address'))
          })
        )
        .subscribe(
          (contact: Contact) => {
            this.contact = contact;
            this.clientService.getClientOfContact(contact).pipe(
              take(1),
            ).subscribe(
              (client: Client) => {
                this.client = client;
                this.lookupResReceived(client);
              }
            ),
            error => {
              console.error(error);
              this.lookupFailed = true;
            }
          },
          error => {
            console.error(error);
            this.lookupFailed = true;
          }
        )
    }
    // else {
    //   this.clientService.findClientByAccountNumberOrEmail(querystring)
    //     .subscribe(
    //       (res: Client) => {
    //         this.lookupResReceived(res);
    //       }, 
    //       error => {
    //         console.log(error);
    //         this.lookupFailed = true;
    //       }
    //     )
    // }
  }

  onConfirm(approval: boolean) {
    if (approval) {
      this.companyConfirmed = true;
    } else {
      this.companyConfirmed = false;
      delete this.client, this.contact;
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
    if (this.client) {
      console.log('Verification email sent to ' + this.contact.email);
      this.userService.sendVerificationEmail(this.contact.email);
    }
  }

  lookupResReceived(data) {
    if (data) {
    // if (data.length > 0) {
      this.client = data;
      console.log(this.client);
      // console.log(this.client);
    } else {
      this.lookupFailed = true;
      // console.log(this.client);
      // console.log(this.lookupFailed);
    }
  }
}
