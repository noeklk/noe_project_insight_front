import { NoteService } from "./../../service/note.service";
import { NoteDto } from "./../../dto/note";
import { Component, OnInit, Input } from "@angular/core";
import { HomeComponent } from "../home/home.component";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  @Input() notes: NoteDto[];
  constructor(private noteService: NoteService, private home: HomeComponent) { }
  displayedColumns: string[] = ["id", "note", "message", "id_etudiant", "id_module", "cmd"];
  ngOnInit() {
  }

  async DeleteANoteById(id: string) {
    if (confirm("Etes vous sûr de vouloir supprimer cette note ?")) {

      alert(await this.noteService.DeleteANoteById(id).then((res) => {
        return res.body.message;
      }).catch((e) => {
        alert(e.error.message);
        throw e;
      }));

      this.home.notes = await this.noteService.GetAllNotes().then((res) => {
        return res.body;
      }).catch((e) => {
        alert(e.error.message);
        return null;
      });
    }
  }
}
