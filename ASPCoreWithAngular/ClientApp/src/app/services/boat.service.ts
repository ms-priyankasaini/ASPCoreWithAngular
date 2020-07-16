import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { boatDetails } from 'src/models/boatdetails';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  boatAppUrl = '';

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    
    this.boatAppUrl = baseUrl + 'api/Boat/';
  }

  getAvailableBoatList() {
    return this._http.get(this.boatAppUrl + 'GetBoatList')
      .pipe(map(
        response => {
          return response;
        }));
  }

  getReturnBoatList() {
    return this._http.get(this.boatAppUrl + 'getReturnBoatList')
      .pipe(map(
        response => {
          return response;
        }));
  }

  AddBoatDetails(boatObj: boatDetails) {
    return this._http.post(this.boatAppUrl + 'Create', boatObj)
      .pipe(map(
        response => {
          return response;
        }));
  }

  RentBoatDetails(boatno: number, custname: string) {
    var data = { 'boatno': boatno, 'custname': custname };
    return this._http.put(this.boatAppUrl + 'RentBoat/' + boatno + '/' + custname,'')
      .pipe(map(
        response => {
          return response;
        }));
  }

  ReturnBoat(boatno: number) {

    return this._http.put(this.boatAppUrl + 'ReturnBoat/'+ boatno,'')
      .pipe(map(
        response => {
          return response;
        }));
  }

  DeregisterBoat(boatno: number) {

    return this._http.delete(this.boatAppUrl + 'DeleteBoat/'+ boatno)
      .pipe(map(
        response => {
          return response;
        }));
  }
}
