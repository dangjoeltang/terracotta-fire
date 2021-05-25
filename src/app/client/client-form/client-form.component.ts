import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  clientForm = new FormGroup({
    accountNumber: new FormControl(),
    clientName: new FormControl(),
    businessType: new FormControl(),
    accountType: new FormControl(),
    companySize: new FormControl(),
    discount: new FormControl(),
    paymentTerms: new FormControl(),
    taxResaleNumber: new FormControl(),

    streetAddress: new FormGroup({
      street: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zip: new FormControl()
    }),

    contacts: new FormArray([]),
  })

  get f() { return this.clientForm.controls; }
  get fContacts() { return this.f.contacts as FormArray; }

  contactForm = new FormGroup({

  })

  addContact() {
    this.fContacts.push(this.formBuilder.group({
      name: [''],
      phone: [''],
      email: [''],
      fax: ['']
    }))
  }

  onSubmit() {
    console.log(this.clientForm.value)
    return
  }

  onCancel() {
    this.clientForm.reset();
    this.fContacts.clear();
    this.router.navigate(['/clients']);
  }
}
 