
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoatService } from '../services/boat.service';

@Component({
  selector: 'app-rent-boat',
  templateUrl: './app-renting.component.html',
  styleUrls: []
})
export class BoatRentingComponent implements OnInit {

  boatRentForm: FormGroup;
  boatList: number[];

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _boatService: BoatService, private _router: Router) {

    this.boatRentForm = this._fb.group({
      boatnumber: ['', [Validators.required]],
      custname: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this._boatService.getAvailableBoatList().subscribe(
      (data: number[]) => this.boatList = data
    );
  }

  save() {

    if (!this.boatRentForm.valid) {
      return;
    }


    this._boatService.RentBoatDetails(this.boatRentForm.get('boatnumber').value, this.boatRentForm.get('custname').value)
      .subscribe((response: number) => {

        alert('Boat is rented successfully! ');
        this._router.navigate(['/']);
      }, error => {
        console.error(error);
          alert('Error Occured during renting :' + error);
      });
  }

  cancel() {
    this._router.navigate(['/']);
  }


}
