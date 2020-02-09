import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { ModuleDto } from "../dto/module";

@Injectable({
  providedIn: "root"
})
export class ModuleService {
  private _getAllModulesUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.module.get_all_modules}`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  GetAllModules(): Promise<HttpResponse<ModuleDto[]>> {
    // tslint:disable-next-line:max-line-length
    const res = this.http.get<ModuleDto[]>(this._getAllModulesUrl, { headers: this.auth.GenerateHeader() , observe: "response" }).toPromise();
    return res;
  }
}
