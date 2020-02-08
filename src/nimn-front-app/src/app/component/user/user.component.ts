import { LoginModel } from "./../../model/user/login";
import { UserService } from "./../../service/user.service";
import { Component, OnInit } from "@angular/core";
import { UserDto } from "../../dto/user";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  userId = "N/A";
  logged = false;
  user = new UserDto();
  constructor(private userService: UserService) { }

  async ngOnInit() {
    // const user = await this.userService.GetAUserById(this.userId).then((res: HttpResponse<UserModel>) => {
    //   return res;
    // }).catch((e: HttpErrorResponse) => {
    //   console.log(e);
    //   alert(`${e.error.message}`);
    // });
  }

  // UserLogin() {
  //   const login = this.userService.UserLogin(this.user).then((res: HttpResponse<LoginModel>) => {
  //     const { token } = res.body;
  //     window.localStorage.setItem("accessToken", token);
  //     this.userId = res.body.user.id;
  //     window.localStorage.setItem("userId", this.userId);
  //     this.logged = true;
  //     alert("Connecté");
  //   }).catch((e: HttpErrorResponse) => {
  //     console.log(e);
  //     alert(`${e.error.message}`);
  //   });

  //   return login;
  // }

  UserSignup(user: UserDto) {

  }
}
