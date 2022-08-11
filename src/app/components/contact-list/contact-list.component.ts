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
  contactId!: number;

  constructor(
    private contactService: ContactService,
    private router: Router,
  ) {
    this.getContacts();

  }



  private getContacts() {
    this.contactService.getAllContacts().subscribe((contact) => {
      this.contacts = contact;
    });
  }

  createSubmit() {
    // this.contactId = this.contacts.length;
    this.getContacts();
    this.contact.id = this.contacts.length + 1;
    if(this.name){
      this.contact.first_name = this.name;
    }
    this.contact.first_name = this.name.split(' ')[0];
    this.contact.last_name = this.name.split(' ')[1];

    // console.log(this.contact.id);
    // console.log(this.contact.first_name);
    // console.log(this.contact.last_name);

    this.contactService.createContact(this.contact).subscribe(data => {
      this.router.navigateByUrl('/contacts');
      // this.router.navigate(['/contacts']).then();
    });
    this.getContacts();
  }

  ngOnInit(): void {

  }

}
