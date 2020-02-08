import { MatDatepickerModule } from "@angular/material/datepicker";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "nimn-front-app";
  ngOnInit() {
    // CHECK DU TOKEN ON REFRESH
    // CREER LE CHECK DANS LE BACK ET UTILISER CETTE ROUTE DANS NGONINIT DE APPCOMPONENT
    // SI TOKEN = VALIDER ALORS REDIRIGER SUR MON PROFIL AVEC NOM PRENOM PSEUDO, SESSIONS ET MODULES
  }

}
