import { UserService } from "./service/user.service";
import { AuthGuard } from "./guard/auth.guard";
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
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavComponent } from "./component/shared/nav/nav.component";
import { LoginComponent } from "./component/login/login.component";
import { SignupComponent } from "./component/signup/signup.component";
import { HomeComponent } from "./component/home/home.component";
import { AuthService } from "./service/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ModuleComponent,
    SessionComponent,
    NoteComponent,
    NavComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
