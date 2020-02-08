import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  public userIdName = "userId";

  constructor() { }

  SetUserId(id: string) {
    localStorage.setItem(this.userIdName, id);
  }

  GetUserId(): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem(this.userIdName));
    });
  }
}
