import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SessionDto } from "src/app/dto/session";

@Component({
  selector: "app-session-create",
  templateUrl: "./session-create.component.html",
  styleUrls: ["./session-create.component.scss"]
})
export class SessionCreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SessionCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SessionDto) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
