import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  searchForEmployeeReg(terms: Observable<string>): any {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchEmployeeEntries(term))
    );
  }

  searchEmployeeEntries(term: string): Observable<object> {
    if (term === '') {
      return of({});
    }
    const url = `${this.baseUrl + `employee/${term}/term`}`;
    return this.http.get(url);
  }
}
