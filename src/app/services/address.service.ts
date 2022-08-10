import { CONTACT_URL, BASE_URL } from './../shared/urls';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Address } from '../shared/models/Address';
import { ADDRESS_URL } from '../shared/urls';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(ADDRESS_URL);
  }

  getAddress(contactId: number): Observable<Address[]> {
    return this.http.get<Address[]>(CONTACT_URL + "/" + contactId + "/addresses");
  }

  createAddress(address: Address){
    const url = BASE_URL + "/addresses";
    return this.http.post<Address>(url, address);
  }

  updateAddress(address: Address, addressId: number){
    const url = BASE_URL + "/addresses/" + addressId;
    return this.http.patch<Address>(url, address).pipe(catchError(this.handleError));
  }

  // error handlind
  public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      // client error
      errorMessage = `Error: ${error.error.message}`
    }else {
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
