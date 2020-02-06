import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material-module";
import { UserComponent } from "./component/user/user.component";
import { ModuleComponent } from "./component/module/module.component";
import { SessionComponent } from "./component/session/session.component";
import { NoteComponent } from "./component/note/note.component";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ModuleComponent,
    SessionComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
