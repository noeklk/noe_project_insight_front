import { NoteDto } from "./../../dto/note";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  @Input() notes: NoteDto[];
  constructor() { }
  displayedColumns: string[] = ["id", "note", "message", "id_etudiant", "id_module"];
  ngOnInit() {
  }

}
