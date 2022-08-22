import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/shared/models/Contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts!: Contact[];
  contact: Contact = new Contact();
  name!: string;
  errorMessage?: string;
  countId!: number;

  constructor(
    private contactService: ContactService,
    private router: Router,
  ) {
    this.contactService.getAllContacts().subscribe((contact) => {
      this.contacts = contact;
      this.countId++;
    });
  }

  createSubmit() {
    this.contact.id = this.countId;
    if (this.name) {
      this.contact.first_name = this.name;
      this.contact.first_name = this.name.trim().split(' ')[0];
      this.contact.last_name = this.name.trim().substring(this.contact.first_name.length + 1);
    } else {
      this.errorMessage = 'Name is invalid';
    }

    if (this.name && this.name.trim().length >= 1) {
      this.contactService.createContact(this.contact).subscribe(data => {
        this.router.navigateByUrl('/contacts');
      });
      window.location.reload();
    }
  }

  ngOnInit(): void {

  }

}
