import {Component, OnInit, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Place} from '../../app.component';

@Component({
  selector: 'app-add-place-dialog',
  templateUrl: './add-place-dialog.component.html',
  styleUrls: ['./add-place-dialog.component.scss']
})
export class AddPlaceDialogComponent implements OnInit {

  @Input() place: Place = { name: '', file: '', description: '' };

  constructor(private ref: MatDialogRef<AddPlaceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log('init');
    console.log(this.data);
    if (!this.data) {
      this.place = { name: '', file: '', description: '' };
    } else {
      this.place = this.data.place;
    }
  }

  save() {
    if (this.place.name === '' || this.place.file === '' || this.place.description === '')
      return;
    else
      this.ref.close(this.place)
  }
}
