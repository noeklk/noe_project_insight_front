import { UserCreateComponent } from "./../user/user-create/user-create.component";
import { SessionCreateComponent } from "./../session/session-create/session-create.component";
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
import { MatDialog } from "@angular/material";


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

  etudiant_notes: NoteDto[];

  new_session: SessionDto;
  new_user: UserDto;

  view: string;

  isAdmin = false;

  constructor(private homeService: HomeService,
    private userService: UserService,
    private sessionService: SessionService,
    private moduleService: ModuleService,
    private noteService: NoteService,
    public dialog: MatDialog) { }

  async CreateASession() {
    const dialogRef = this.dialog.open(SessionCreateComponent, {
      width: "300px",
      data: { }
    });

    const closed = await dialogRef.afterClosed().toPromise().then((res: SessionDto) => {
      if (res.annee_promo && res.nom_promo) {
        this.new_session = res;
        return true;
      } else {
        return false;
      }
    }).catch((e) => {
      return false;
    });

    if (closed) {
      const hasUpdated = await this.sessionService.CreateASession(this.new_session).then((result) => {
        alert(result.body.message);
        return true;
      }).catch((e) => {
        alert(e.error.message);
        return false;
      });

      if (hasUpdated) {
        this.sessions = await this.sessionService.GetAllSessions().then((res) => {
          return res.body;
        }).catch((e) => {
          throw e;
        });
      }
    }
  }

  async CreateAUser() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: "300px",
      data: { }
    });

    const closed = await dialogRef.afterClosed().toPromise().then((res: UserDto) => {
      if (res.nom && res.prenom && res.password && res.role) {
        this.new_user = res;
        return true;
      } else {
        return false;
      }
    }).catch((e) => {
      return false;
    });

    if (closed) {
      const hasUpdated = await this.userService.UserRegister(this.new_user).then((result) => {
        alert(result.body.message);
        return true;
      }).catch((e) => {
        alert(e.error.message);
        return false;
      });

      if (hasUpdated) {
        this.users = await this.userService.GetAllUsers().then((res) => {
          return res.body;
        }).catch((e) => {
          throw e;
        });
      }
    }
  }

  async GetAllSessions() {
    this.sessions = await this.sessionService.GetAllSessions().then((res) => {
      return res.body;
    }).catch((e) => {
      alert(e.error.message);
      return null;
    });
  }

  async GetAllModules() {
    this.modules = await this.moduleService.GetAllModules().then((res) => {
      return res.body;
    }).catch((e) => {
      alert(e.error.message);
      return null;
    });
  }

  async GetAllNotes() {
    this.notes = await this.noteService.GetAllNotes().then((res) => {
      return res.body;
    }).catch((e) => {
      alert(e.error.message);
      return null;
    });
  }

  async GetAllUsers() {
    this.users = await this.userService.GetAllUsers().then((res) => {
      return res.body;
    }).catch((e) => {
      alert(e.error.message);
      return null;
    });
  }

  async GetAUserByid(id: string) {
    return await this.userService.GetAUserById(id).then((res) => {
      return res.body;
    }).catch((e) => {
      alert(e.error.message);
      throw e;
    });
  }

  async GetAllNotesByStudentId() {
    this.etudiant_notes = await this.noteService.GetAllNotesByStudentId(this.user._id).then((res) => {
      return res.body;
    }).catch((e) => {
      alert(e.error.message);
      throw e;
    });
  }

  async ngOnInit() {
    const userId = await this.homeService.GetUserId();

    this.user = await this.GetAUserByid(userId);

    const admin = this.user.role === "admin";

    if (admin) {
      this.isAdmin = true;
    } else {
      console.log("guest area");
    }
  }
}
