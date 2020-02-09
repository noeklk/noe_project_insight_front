import { HomeService } from "./home.service";
import { MessageModel } from "./../model/message";
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _tokenCheckUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.token_check}`;
  private _tokenName = "accessToken";

  public isLoggedIn = false;

  constructor(private myRoute: Router, private http: HttpClient, private home: HomeService) { }

  GenerateHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.GetToken()
    });
  }

  CheckToken(): Promise<HttpResponse<MessageModel>> {
    console.log(this._tokenCheckUrl);

    const res = this.http.get<MessageModel>(this._tokenCheckUrl, { headers: this.GenerateHeader(), observe: "response" }).toPromise();

    return res;
  }

  SetToken(token: string) {
    localStorage.setItem(this._tokenName, token);
  }

  GetToken(): string {
    return localStorage.getItem(this._tokenName);
  }

  HasToken(): boolean {
    return this.GetToken() != null;
  }

  HasValidToken(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.HasToken()) {
        this.myRoute.navigate(["login"]);
        console.log("no, you dont have any token, maybe log first :) ?");
      } else {
        this.CheckToken().then((res: HttpResponse<MessageModel>) => {
          console.log("nice you have a valid token, come on in !");
          this.isLoggedIn = true;
          return resolve(true);
        }).catch((error: HttpErrorResponse) => {
          console.log("what are you doing here ? please login again :)");
          this.Logout();
          return reject(false);
        });
      }
    });
  }

  Logout() {
    localStorage.removeItem(this._tokenName);
    localStorage.removeItem(this.home.userIdName);
    this.isLoggedIn = false;
    this.myRoute.navigate(["login"]);
  }
}
