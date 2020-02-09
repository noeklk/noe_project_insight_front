import { SessionDto } from "../../../dto/session";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-session-edit",
  templateUrl: "./session-edit.component.html",
  styleUrls: ["./session-edit.component.scss"]
})
export class SessionEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SessionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SessionDto) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
