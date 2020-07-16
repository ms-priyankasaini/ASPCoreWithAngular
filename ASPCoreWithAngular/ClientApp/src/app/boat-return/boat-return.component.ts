import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoatService } from '../services/boat.service';
import { apireturnobj } from '../../models/apireturnobj';

@Component({
  selector: 'app-rent-boat',
  templateUrl: './boat-return.component.html',
  styleUrls: []
})
export class BoatReturnComponent implements OnInit {
  boatReturnForm: FormGroup;
  boatList: number[];

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _boatService: BoatService, private _router: Router) {

    this.boatReturnForm = this._fb.group({
      boatnumber: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this._boatService.getReturnBoatList().subscribe(
      (data: number[]) => this.boatList = data
    );
  }

  save() {

    if (!this.boatReturnForm.valid) {
      return;
    }

    this._boatService.ReturnBoat(this.boatReturnForm.get('boatnumber').value)
      .subscribe((response: apireturnobj) => {

        alert('Boat is returned successfully! Boat rent price :' + response.price + ' ' + 'Boat RentDate :' + response.rentdate);
        this._router.navigate(['/']);
      }, error => {
          alert('Error Occured during returning boat :' + error._body);
      });
  }

  cancel() {
    this._router.navigate(['/']);
  }


}
