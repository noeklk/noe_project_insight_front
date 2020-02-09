import { SessionDto } from "./../../dto/session";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-session",
  templateUrl: "./session.component.html",
  styleUrls: ["./session.component.scss"]
})
export class SessionComponent implements OnInit {
  @Input() sessions: SessionDto[];
  constructor() { }
  displayedColumns: string[] = ["id", "nom", "annee"];
  ngOnInit() {
  }

}
