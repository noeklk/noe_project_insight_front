import { NoteService } from "./../../service/note.service";
import { ModuleService } from "./../../service/module.service";
import { Component, OnInit, Input } from "@angular/core";
import { ModuleDto } from "src/app/dto/module";
import { HomeComponent } from "../home/home.component";

@Component({
  selector: "app-module",
  templateUrl: "./module.component.html",
  styleUrls: ["./module.component.scss"]
})
export class ModuleComponent implements OnInit {
  @Input() modules: ModuleDto[];
  constructor(private moduleService: ModuleService, private home: HomeComponent, private noteService: NoteService) { }
  displayedColumns: string[] = ["id", "nom", "date_debut", "date_fin", "id_intervenant", "id_session", "cmd"];
  ngOnInit() {
  }

  async GetNotesAverageByModuleId(id: string) {
    alert(await this.noteService.GetNotesAverageByModuleId(id).then((res) => {
      return res.body.message;
    }).catch((e) => {
      return e.error.message;
    }));
  }

  async DeleteAModuleById(id: string) {
    if (confirm("Etes vous sûr de vouloir supprimer ce module ?")) {

      await this.moduleService.DeleteAModuleById(id).then((res) => {
        alert(res.body.message);
      }).catch((e) => {
        alert(e.error.message);
        throw e;
      });

      this.home.modules = await this.moduleService.GetAllModules().then((res) => {
        return res.body;
      }).catch((e) => {
        throw e;
      });
    }
  }
}
