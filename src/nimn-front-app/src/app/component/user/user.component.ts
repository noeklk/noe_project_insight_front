import { UserService } from "./../../service/user.service";
import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../model/user";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  async ngOnInit() {
    const new_user = new UserModel();

    new_user.pseudo = "admin";
    new_user.password = "admin";

    const login = await this.userService.UserLogin(new_user).then((res: HttpResponse<JSON>) => {
      return res;
    });

    console.log(login);
    console.log(login.body._id);

    const user = await this.userService.GetAUserById(login.body._id).then((res: HttpResponse<JSON>) => {
      return res;
    });

    console.log(user);
  }

}
