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
import { SessionEditComponent } from "./component/session/session-edit/session-edit.component";
import { SessionCreateComponent } from "./component/session/session-create/session-create.component";
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from "@angular/material";
import { MomentUtcDateAdapter } from "./helper/moment-utc-date-adapter";
import { APP_DATE_FORMATS } from "./app.config";
import { DatePipe } from "@angular/common";
import { UserCreateComponent } from "./component/user/user-create/user-create.component";

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
    HomeComponent,
    SessionEditComponent,
    SessionCreateComponent,
    UserCreateComponent
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
  entryComponents: [SessionEditComponent, SessionCreateComponent, UserCreateComponent],
  providers: [AuthService, AuthGuard, UserService,
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
