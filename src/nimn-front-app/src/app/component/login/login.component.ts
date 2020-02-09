import { HomeService } from "./../../service/home.service";
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
  constructor(private fb: FormBuilder, private myRoute: Router, private auth: AuthService, private userService: UserService,
    private home: HomeService) {
    this.form = fb.group({
      pseudo: ["", [Validators.required]],
      password: [""]
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
        const { id } = res.body.user;

        this.auth.SetToken(token);
        this.home.SetUserId(id);

        this.myRoute.navigate(["home"]);
        console.log("Connecté!");
      }).catch((e: HttpErrorResponse) => {
        alert(`${e.error.message}`);
      });
    }

  }
}
