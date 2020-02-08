import { UserService } from "./../../service/user.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { UserDto } from "src/app/dto/user";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { LoginModel } from "src/app/model/user/login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form;
  userDto = new UserDto();
  constructor(private fb: FormBuilder, private myRoute: Router, private auth: AuthService, private userService: UserService) {
    this.form = fb.group({
      pseudo: ["", [Validators.required]],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.userDto = this.form.value;
      console.log(this.userDto);

      this.userService.UserLogin(this.userDto).then((res: HttpResponse<LoginModel>) => {
        const { token } = res.body;
        this.auth.SendToken(token);
        window.localStorage.setItem("userId", res.body.user.id);
        this.myRoute.navigate(["home"]);
        console.log("Connecté!");

      }).catch((e: HttpErrorResponse) => {
        console.log(e);
        alert(`${e.error.message}`);
      });
    }

  }
}
