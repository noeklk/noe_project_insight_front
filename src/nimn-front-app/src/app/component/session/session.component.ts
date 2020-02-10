import { SessionEditComponent } from "./session-edit/session-edit.component";
import { SessionService } from "./../../service/session.service";
import { SessionDto } from "./../../dto/session";
import { Component, OnInit, Input } from "@angular/core";
import { HomeComponent } from "../home/home.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"]
})
export class SessionComponent implements OnInit {
  @Input() sessions: SessionDto[];
  update_session: SessionDto;
  constructor(private sessionService: SessionService, private home: HomeComponent, public dialog: MatDialog) { }
  displayedColumns: string[] = ["id", "nom", "annee", "cmd"];
  ngOnInit() {
  }

  async GetASessionById(id: string): Promise<SessionDto> {
    return await this.sessionService.GetASessionById(id).then((res) => {
      return res.body;
    }).catch((e) => {
      console.log(e.error.message);
      throw e;
    });
  }

  async UpdateASessionById(id: string) {
    this.update_session = await this.GetASessionById(id);

    const dialogRef = this.dialog.open(SessionEditComponent, {
      width: "300px",
      data: { nom_promo: this.update_session.nom_promo, annee_promo: this.update_session.annee_promo }
    });


    const closed = await dialogRef.afterClosed().toPromise().then((res: SessionDto) => {
      if (res) {
        this.update_session = res;
        return true;
      } else {
        return false;
      }
    }).catch((e) => {
      return false;
    });

    if (closed) {
      const hasUpdated = await this.sessionService.UpdateASessionById(id, this.update_session).then((result) => {
        alert(result.body.message);
        return true;
      }).catch((e) => {
        alert(e.error.message);
        return false;
      });

      if (hasUpdated) {
        this.home.sessions = await this.sessionService.GetAllSessions().then((res) => {
          return res.body;
        }).catch((e) => {
          throw e;
        });
      }
    }
  }

  async DeleteASessionById(id: string) {
    if (confirm("Etes vous sûr de vouloir supprimer cette session ?")) {

      alert(await this.sessionService.DeleteASessionById(id).then((res) => {
        return res.body.message;
      }).catch((e) => {
        alert(e.error.message);
        throw e;
      }));

      this.home.sessions = await this.sessionService.GetAllSessions().then((res) => {
        return res.body;
      }).catch((e) => {
        throw e;
      });
    }
  }
}
