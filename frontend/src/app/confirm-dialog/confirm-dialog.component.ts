import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

/**
 * A basic confirmation box.
 */
export class ConfirmDialogComponent implements OnInit {

  // The event name to show in the confirmation.
  eventName: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
    this.eventName = data;
  }

  // On Confirm
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  // On Cancel
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }



}
