import { Component, OnInit, Input } from "@angular/core";
import { ModuleDto } from "src/app/dto/module";

@Component({
  selector: "app-module",
  templateUrl: "./module.component.html",
  styleUrls: ["./module.component.scss"]
})
export class ModuleComponent implements OnInit {
  @Input() modules: ModuleDto[];
  constructor() { }
  displayedColumns: string[] = ["id", "nom", "date_debut", "date_fin", "id_intervenant", "id_session"];
  ngOnInit() {
  }

}
