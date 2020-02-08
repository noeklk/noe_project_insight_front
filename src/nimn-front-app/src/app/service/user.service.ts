import { LoginModel } from "../model/user/login";
import { UserDto } from "../dto/user";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _userLoginUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.user.login}`;
  private _getAUserByIdUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.user.get_a_user_by_id}`;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: window.localStorage.getItem("accessToken")
    })
  };

  UserLogin(user: UserDto): Promise<HttpResponse<LoginModel>> {
    console.log(this._userLoginUrl);
    const res = this.http.post<LoginModel>(this._userLoginUrl, user, { observe: "response" }).toPromise();
    return res;
  }

  GetAUserById(id: string): Promise<HttpResponse<UserDto>> {
    const paramUrl = `${this._getAUserByIdUrl}${id}`;
    console.log(this._getAUserByIdUrl);
    // tslint:disable-next-line:max-line-length
    const res = this.http.get<UserDto>(paramUrl, { headers: this.httpOptions.headers, observe: "response" }).toPromise();
    return res;
  }

}
