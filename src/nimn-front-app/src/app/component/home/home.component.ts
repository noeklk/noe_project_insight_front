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

  view: string;

  isAdmin = false;

  constructor(private home: HomeService,
    private userService: UserService,
    private sessionService: SessionService,
    private moduleService: ModuleService,
    private noteService: NoteService,
    public dialog: MatDialog) { }

  async CreateASession() {
    const dialogRef = this.dialog.open(SessionCreateComponent, {
      width: "300px",
      data: { nom_promo: "", annee_promo: "" }
    });

    const closed = await dialogRef.afterClosed().toPromise().then((res: SessionDto) => {
      console.log("the dialog was closed");
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
    const userId = await this.home.GetUserId();

    this.user = await this.GetAUserByid(userId);

    const admin: Promise<boolean> = new Promise((resolve, reject) => {
      if (this.user.role === "admin") {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    if (await admin) {
      this.isAdmin = true;
      // await this.GetAllSessions();

      // await this.GetAllModules();

      // await this.GetAllNotes();

      // await this.GetAllUsers();
    } else {
      console.log("guest area");
    }
  }
}
