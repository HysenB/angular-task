
import { CountryService } from './../../services/country.service';
import { ContactService } from './../../services/contact.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Contact } from 'src/app/shared/models/Contact';
import { AddressService } from 'src/app/services/address.service';
import { Address } from 'src/app/shared/models/Address';
import { Country } from 'src/app/shared/models/Country';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact!: Contact;
  addresses!: Address[];
  countries!: Country[];
  vAddress: Address = new Address();
  showForm: boolean = false;
  // addressId!: Address[];
  countAddressId!: number;
  errorMessage?: string;

  newForm = new FormGroup({
    street1: new FormControl('', Validators.required),
    street2: new FormControl('', Validators.required),
    town: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  })

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private addressService: AddressService,
    private countryService: CountryService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.contactService.getContact(params['id']).subscribe(contact => this.contact = contact);
        this.addressService.getAddress(params['id']).subscribe(address => {
          this.addresses = address
        });
        this.addressService.getAllAddresses().subscribe(() => {
          this.countAddressId++;
        })
      }
    })
    this.countryService.getAllCountries().subscribe(country => this.countries = country);
  }


  addForm(): void {
    this.newForm.reset();
    this.newForm.markAsPristine();
    this.newForm.markAsUntouched();
    this.showForm = !this.showForm;
  }

  submit(): void {
    this.vAddress.id = this.countAddressId;
    this.vAddress.contactId = this.contact.id.toString();
    if (this.newForm.valid && !this.newForm.validator) {
      this.vAddress.street1 = this.newForm.value.street1;
      this.vAddress.street2 = this.newForm.value.street2;
      this.vAddress.town = this.newForm.value.town;
      this.vAddress.country = this.newForm.value.country;

      this.addressService.createAddress(this.vAddress).subscribe(() => {
        this.router.navigateByUrl(`/contacts/${this.vAddress.contactId}`)
      })

      this.errorMessage = '';
      this.addForm();
      window.location.reload();
    } else if (this.showForm) {
      this.errorMessage = 'Blank inputs!';
    } else {
      this.addresses.map(address => {
        let id: number = address.id;
        this.addressService.updateAddress(address, id).subscribe(() => {
          this.router.navigateByUrl(`/contacts/${address.contactId}`);
        })
      })
      window.location.reload();
    }


  }

  ngOnInit(): void {


  }


}

