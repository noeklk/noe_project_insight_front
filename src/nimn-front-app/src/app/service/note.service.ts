import { NoteDto } from "./../dto/note";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { MessageModel } from "../model/message";

@Injectable({
  providedIn: "root"
})
export class NoteService {
  private _getNotesAverageByModuleIdUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.note.get_notes_average_by_module_id}`;
  private _getAllNotesUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.note.get_all_notes}`;
  private _getAllNotesByStudentId = `${environment.nodejs_api_host}${environment.nodejs_api_route.note.get_all_notes_by_student_id}`;

  private _deleteANoteByIdUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.note.delete_a_note_by_id}`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  GetAllNotes(): Promise<HttpResponse<NoteDto[]>> {
    const res = this.http.get<NoteDto[]>(this._getAllNotesUrl, { headers: this.auth.GenerateHeader(), observe: "response" }).toPromise();
    return res;
  }

  GetAllNotesByStudentId(id_etudiant: string): Promise<HttpResponse<NoteDto[]>> {
    const paramUrl = `${this._getAllNotesByStudentId}${id_etudiant}/notes`;
    const res = this.http.get<NoteDto[]>(paramUrl, { headers: this.auth.GenerateHeader(), observe: "response" }).toPromise();
    return res;
  }

  GetNotesAverageByModuleId(id_module: string): Promise<HttpResponse<MessageModel>> {
    const paramUrl = `${this._getNotesAverageByModuleIdUrl}${id_module}/notes/average`;
    const res = this.http.get<MessageModel>(paramUrl, { headers: this.auth.GenerateHeader(), observe: "response" }).toPromise();
    return res;
  }

  DeleteANoteById(id: string): Promise<HttpResponse<MessageModel>> {
    const paramUrl = `${this._deleteANoteByIdUrl}${id}`;
    const res = this.http.delete<MessageModel>(paramUrl, { headers: this.auth.GenerateHeader(), observe: "response" }).toPromise();
    return res;
  }
}
