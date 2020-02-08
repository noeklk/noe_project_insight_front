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

  constructor(private myRoute: Router, private http: HttpClient) { }

  CheckToken(): Promise<HttpResponse<MessageModel>> {
    console.log(this._tokenCheckUrl);
    const headers = new HttpHeaders({
      Authorization: this.GetToken()
    });

    const res = this.http.get<MessageModel>(this._tokenCheckUrl, { headers, observe: "response" }).toPromise();

    return res;
  }

  SendToken(token: string) {
    localStorage.setItem(this._tokenName, token);
  }

  GetToken(): string {
    return localStorage.getItem(this._tokenName);
  }

  HasToken(): boolean {
    return this.GetToken() != null;
  }

  HasValidToken(): boolean {
    if (this.HasToken()) {
      console.log("yes, has token");
      this.CheckToken().then((res: HttpResponse<MessageModel>) => {
        return true;
      }).catch((error: HttpErrorResponse) => {
        return false;
      });
    } else {
      console.log("no, has no token");
      return false;
    }
  }

  Logout() {
    localStorage.removeItem(this._tokenName);
    this.myRoute.navigate(["login"]);
  }
}
