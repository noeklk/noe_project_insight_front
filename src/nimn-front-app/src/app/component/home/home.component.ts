import { NoteService } from "./../../service/note.service";
import { NoteDto } from "./../../dto/note";
import { ModuleDto } from "src/app/dto/module";
import { ModuleService } from "./../../service/module.service";
import { SessionService } from "./../../service/session.service";
import { SessionDto } from "./../../dto/session";
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

  sessions: SessionDto[];
  modules: ModuleDto[];
  notes: NoteDto[];
  users: UserDto[];

  view: string;

  sessionToggle = false;
  moduleToggle = false;
  noteToggle = false;

  constructor(private home: HomeService,
    private userService: UserService,
    private sessionService: SessionService,
    private moduleService: ModuleService,
    private noteService: NoteService) { }

  async ngOnInit() {
    const userId = await this.home.GetUserId();

    this.user = await this.userService.GetAUserById(userId).then((res) => {
      return res.body;
    }).catch((e) => {
      throw e;
    });

    const admin: Promise<boolean> = new Promise((resolve, reject) => {
      if (this.user.role === "admin") {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    if (await admin) {
      this.sessions = await this.sessionService.GetAllSessions().then((res) => {
        return res.body;
      }).catch((e) => {
        throw e;
      });

      this.modules = await this.moduleService.GetAllModules().then((res) => {
        return res.body;
      }).catch((e) => {
        throw e;
      });

      this.notes = await this.noteService.GetAllNotes().then((res) => {
        return res.body;
      }).catch((e) => {
        throw e;
      });

      this.users = await this.userService.GetAllUsers().then((res) => {
        return res.body;
      }).catch((e) => {
        throw e;
      });
    } else {
      console.log("guest");
    }
  }
}
