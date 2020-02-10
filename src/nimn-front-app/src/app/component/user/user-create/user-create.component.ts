import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserDto } from "src/app/dto/user";

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.scss"]
})
export class UserCreateComponent implements OnInit {
  roles: Role[] = [
    { value: "etudiant", viewValue: "Étudiant" },
    { value: "intervenant", viewValue: "Intervenant" },
    { value: "admin", viewValue: "Administrateur" }
  ];

  constructor(public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDto) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
