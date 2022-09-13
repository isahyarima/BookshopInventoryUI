import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MenuRestrictionService {
// baseUrl = environment.baseUrl;
  
constructor(private http: HttpClient,private auth: AuthenticationService) { }

checkActivities(acceptedArr, incomingArr: string[]): boolean {
  if (acceptedArr.length == 0) return true;
  return incomingArr.some(v => acceptedArr.indexOf(v) >= 0) || incomingArr.indexOf('Super Admin') > -1;
}

hideOrShow(activities: any[]): boolean {
let userActivities = this.auth.getUserActivities();
return this.checkActivities(activities, userActivities);
//--- test
return true;
}

}
