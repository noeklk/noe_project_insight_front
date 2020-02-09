import { SessionService } from "./../../service/session.service";
import { SessionDto } from "./../../dto/session";
import { Component, OnInit, Input } from "@angular/core";
import { HomeComponent } from "../home/home.component";

@Component({
  selector: "app-session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"]
})
export class SessionComponent implements OnInit {
  @Input() sessions: SessionDto[];
  constructor(private sessionService: SessionService, private home: HomeComponent) { }
  displayedColumns: string[] = ["id", "nom", "annee", "cmd"];
  ngOnInit() {
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
