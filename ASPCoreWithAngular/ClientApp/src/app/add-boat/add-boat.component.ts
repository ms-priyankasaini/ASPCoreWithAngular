
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoatService } from '../services/boat.service';

@Component({
  selector: 'app-add-boat',
  templateUrl: './add-boat.component.html',
  styleUrls: []
})
export class AddBoatComponent {

  boatAddForm: FormGroup;
  base64string: string;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _boatService: BoatService, private _router: Router) {
    this.boatAddForm = this._fb.group({
      boatnumber: 0,
      boatname: ['', [Validators.required]],
      boatImage: ['', []],
      hourlyRate: ['', [Validators.required]]
    })
  }

  save() {

    if (!this.boatAddForm.valid) {
      return;
    }

    this.boatAddForm.patchValue({
      boatImage:  this.base64string
    });

    this._boatService.AddBoatDetails(this.boatAddForm.value)
      .subscribe((response: number) => {
        alert('Boat is added successfully, Boat No. is :' + response);
          this._router.navigate(['/']);
      }, error => {
          alert('Error Occured during upload :' + error._body);
      });
  }

  cancel() {
    this._router.navigate(['/']);
  }

  onFileChange(event) {

      const MAX_SIZE: number = 1048576;

    if (event.target.files &&
      event.target.files.length > 0) {
      // Don't allow file sizes over 1MB
      if (event.target.files[0].size < MAX_SIZE) {
        // Set theFile property
        var file: File = event.target.files[0];

        var reader: FileReader = new FileReader();

        reader.onload = this.handleFile.bind(this);

        reader.readAsBinaryString(file);

      }
      else {
        alert('File: ' + event.target.files[0].name + ' is too large to upload.');
      }
    }
    
  }

  handleFile(event) {
    var binaryString = event.target.result;
    console.log(binaryString);
    this.base64string = btoa(binaryString);
    console.log(btoa(binaryString));
  }

}
