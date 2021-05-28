import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/services/client/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {

  get f() { return this.clientForm.controls; }
  get fContacts() { return this.f.contacts as FormArray; }

  constructor(private clientsService: ClientService, private formBuilder: FormBuilder, private router: Router) { }

  clientForm = this.formBuilder.group({
    accountNumber: [null],
    clientName: ['', Validators.required],
    businessType: [''],
    accountType: [''],
    discount: [0, Validators.compose([Validators.min(0), Validators.max(100)])],
    paymentTerms: [''],
    taxResaleNumber: [''],
    // accountNumber: new FormControl(),
    // clientName: new FormControl(),
    // businessType: new FormControl(),
    // accountType: new FormControl(),
    // discount: new FormControl(),
    // paymentTerms: new FormControl(),
    // taxResaleNumber: new FormControl(),
  })


  onSubmit() {
    console.log(this.clientForm.value);
    if (this.clientForm.valid) {
      this.clientsService.createClient(this.clientForm.value);
    } else {
      console.log('Form not valid, please check again.');
    }
  }

  onCancel() {
    this.fContacts.clear();
    this.router.navigate(['/clients']);
  }

  logProgress() {
    console.log()
  }
}
 