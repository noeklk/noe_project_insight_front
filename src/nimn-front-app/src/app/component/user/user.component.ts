import { Component, OnInit, Input } from "@angular/core";
import { UserDto } from "../../dto/user";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  @Input() users: UserDto[];
  constructor() { }
  displayedColumns: string[] = ["id", "nom", "prenom", "role", "pseudo", "password"];
  ngOnInit() {

  }


}
