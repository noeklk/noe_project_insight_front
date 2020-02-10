import { SessionDto } from "./../dto/session";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { MessageModel } from "../model/message";

@Injectable({
  providedIn: "root"
})
export class SessionService {

  private _createASession = `${environment.nodejs_api_host}${environment.nodejs_api_route.session.create_a_session}`;
  private _getASessionById = `${environment.nodejs_api_host}${environment.nodejs_api_route.session.get_a_session_by_id}`;
  private _getAllSessionsUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.session.get_all_sessions}`;
  private _updatASessionByIdUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.session.update_session_by_id}`;
  private _deleteASessionById = `${environment.nodejs_api_host}${environment.nodejs_api_route.session.delete_a_session_by_id}`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  CreateASession(session: SessionDto): Promise<HttpResponse<MessageModel>> {
    const res = this.http.post<MessageModel>(this._createASession, session, { headers: this.auth.GenerateHeader(), observe: "response" }).toPromise();
    return res;
  }

  GetASessionById(id: string): Promise<HttpResponse<SessionDto>> {
    const paramUrl = `${this._getASessionById}${id}`;
    const res = this.http.get<SessionDto>(paramUrl, { headers: this.auth.GenerateHeader(), observe: "response" }).toPromise();
    return res;
  }

  GetAllSessions(): Promise<HttpResponse<SessionDto[]>> {
    const res = this.http.get<SessionDto[]>(this._getAllSessionsUrl, { headers: this.auth.GenerateHeader(), observe: "response" }).toPromise();
    return res;
  }

  UpdateASessionById(id: string, session: SessionDto): Promise<HttpResponse<MessageModel>> {
    const paramUrl = `${this._updatASessionByIdUrl}${id}`;
    const res = this.http.put<MessageModel>(paramUrl, session, { headers: this.auth.GenerateHeader(), observe: "response" }).toPromise();
    return res;
  }

  DeleteASessionById(id: string): Promise<HttpResponse<MessageModel>> {
    const paramUrl = `${this._deleteASessionById}${id}`;
    const res = this.http.delete<MessageModel>(paramUrl, { headers: this.auth.GenerateHeader(), observe: "response" }).toPromise();
    return res;
  }
}
