import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-proof-dialog',
  templateUrl: './proof-dialog.component.html',
  styleUrls: ['./proof-dialog.component.css']
})
export class ProofDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProofDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {eventId: number, eventName: string}) { }

  ngOnInit(): void {
  }

}
