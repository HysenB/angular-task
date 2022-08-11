
import { CountryService } from './../../services/country.service';
import { ContactService } from './../../services/contact.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  addressId!: Address[];

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
      this.getAllAC();
    }

  getAllAC(){
    this.activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.contactService.getContact(params['id']).subscribe(contact => this.contact = contact);
        this.addressService.getAddress(params['id']).subscribe(address => this.addresses = address);
      }

    })
    this.countryService.getAllCountries().subscribe(country => this.countries = country);

  }

  addForm(): void {
    this.showForm = true;
  }

  submit(): void {
    this.getAllAC();
    if(this.addressId){
      this.vAddress.id = this.addressId.length + 1;
    }
    this.vAddress.contactId = this.contact.id.toString();
    if(this.newForm.valid){
      this.vAddress.street1 = this.newForm.value.street1;
      this.vAddress.street2 = this.newForm.value.street2;
      this.vAddress.town = this.newForm.value.town;
      this.vAddress.country = this.newForm.value.country;

      this.addressService.createAddress(this.vAddress).subscribe(() => {
        this.router.navigateByUrl(`/contacts/${this.vAddress.contactId}`)
      })
    }

    this.addresses.map(address => {
      let id:number = address.id;
      this.addressService.updateAddress(address, id).subscribe(() => {
        this.router.navigateByUrl(`/contacts/${address.contactId}`);
      })
    })
    window.location.reload();


  }

  ngOnInit(): void {

    this.addressService.getAllAddresses().subscribe(value => {
      this.addressId = value;
    });
  }

}

