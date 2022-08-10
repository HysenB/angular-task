import { CONTACT_URL } from './../shared/urls';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../shared/models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(CONTACT_URL);
  }

  public getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(CONTACT_URL + '/' + id);
  }

  public createContact(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(CONTACT_URL, contact);
  }
}
