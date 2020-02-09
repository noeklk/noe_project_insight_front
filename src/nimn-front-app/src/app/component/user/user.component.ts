import { UserService } from "./../../service/user.service";
import { Component, OnInit, Input } from "@angular/core";
import { UserDto } from "../../dto/user";
import { HomeComponent } from "../home/home.component";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  @Input() users: UserDto[];
  constructor(private userService: UserService, private home: HomeComponent) { }
  displayedColumns: string[] = ["id", "nom", "prenom", "role", "pseudo", "password", "cmd"];
  ngOnInit() {

  }

  async DeleteAUserById(id: string) {
    if (confirm("Etes vous sûr de vouloir supprimer cette session ?")) {

      alert(await this.userService.DeleteAUserById(id).then((res) => {
        return res.body.message;
      }).catch((e) => {
        alert(e.error.message);
        throw e;
      }));

      this.home.users = await this.userService.GetAllUsers().then((res) => {
        return res.body;
      }).catch((e) => {
        throw e;
      });
    }
  }

}
