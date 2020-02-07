import { UserModel } from "./../model/user";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private userLoginUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.user.login}`;
  private getAUserByIdUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.user.get_a_user_by_id}`;

  constructor(private http: HttpClient) { }

  UserLogin(user: UserModel): Promise<HttpResponse<JSON>> {
    const res = this.http.post<JSON>(this.userLoginUrl, user, { observe: "response" }).toPromise();
    return res;
  }

  GetAUserById(id: string): Promise<HttpResponse<JSON>> {
    const res = this.http.get<JSON>(this.getAUserByIdUrl, {observe: "response"}).toPromise();
    return res;
  }

}
