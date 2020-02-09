import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guard/auth.guard";
import { HomeComponent } from "./component/home/home.component";
import { SignupComponent } from "./component/signup/signup.component";
import { LoginComponent } from "./component/login/login.component";

const routes: Routes = [
  {
    path: "", component: HomeComponent, pathMatch: "full", canActivate: [AuthGuard]
  },
  { path: "register", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
