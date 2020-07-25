import { Injectable } from "@angular/core";
import { Blog } from "./blog";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  endpoint: string = "/api"; // TODO: update host
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  // Add blog
  AddBlog(data: Blog): Observable<any> {
    let API_URL = `${this.endpoint}/add-blog`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  // Get all blogs
  GetBlogs() {
    return this.http.get(`${this.endpoint}`);
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
