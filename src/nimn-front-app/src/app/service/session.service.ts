import { SessionDto } from "./../dto/session";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  private _getAllSessionsUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.session.get_all_sessions}`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  GetAllSessions(): Promise<HttpResponse<SessionDto[]>> {
    // tslint:disable-next-line:max-line-length
    const res = this.http.get<SessionDto[]>(this._getAllSessionsUrl, { headers: this.auth.GenerateHeader() , observe: "response" }).toPromise();
    return res;
  }
}
