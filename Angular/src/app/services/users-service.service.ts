import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationData } from '../models/RegitrationData';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    //  The http request will be sent after the subscribe() method will be called
    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
  }

  public register(userRegistrationDetails: RegistrationData) {
    return this.http.post("http://localhost:3001/users/", userRegistrationDetails);
  }

  public getAllUserDetails():Observable<RegistrationData> {
    return this.http.get<RegistrationData>("http://localhost:3001/users/");
  }
}



