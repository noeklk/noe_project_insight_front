import { UserService } from "./../../service/user.service";
import { UserDto } from "src/app/dto/user";
import { HomeService } from "./../../service/home.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  user = new UserDto();

  constructor(private home: HomeService, private userService: UserService) { }

  async ngOnInit() {
    const userId = await this.home.GetUserId();

    this.user = await this.userService.GetAUserById(userId).then((res) => {
      return res.body;
    }).catch((e) => {
      throw e;
    });
  }

}
