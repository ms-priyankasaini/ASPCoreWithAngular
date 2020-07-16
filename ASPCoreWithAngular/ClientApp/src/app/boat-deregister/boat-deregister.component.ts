import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoatService } from '../services/boat.service';

@Component({
  selector: 'app-deregister-boat',
  templateUrl: './boat-deregister.component.html',
  styleUrls: []
})
export class BoatDeregisterComponent implements OnInit {
  boatDeleteForm: FormGroup;
  boatList: number[];

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _boatService: BoatService, private _router: Router) {

    this.boatDeleteForm = this._fb.group({
      boatnumber: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this._boatService.getAvailableBoatList().subscribe(
      (data: number[]) => this.boatList = data
    );
  }

  save() {

    if (!this.boatDeleteForm.valid) {
      return;
    }

    this._boatService.DeregisterBoat(this.boatDeleteForm.get('boatnumber').value)
      .subscribe((response: number) => {
        console.log(response);
        alert('Boat is deregistered successfully! ');
        this._router.navigate(['/']);
      }, error => {
        console.error(error);
          alert('Error Occured during deregistering :' + error);
      });
  }

  cancel() {
    this._router.navigate(['/']);
  }


}
