import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent implements OnInit {

  eventName: string;
  userName: string;

  constructor(public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {eventName: string, currentUser: string}) { 
    this.eventName = data.eventName;
    this.userName = data.currentUser;
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
