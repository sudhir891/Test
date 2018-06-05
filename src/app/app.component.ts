import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  filterByState: Data[];
  filteredRoleArray: Member[];
  result = [];
  users = [];
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get<Data[]>('https://h93rvy36y7.execute-api.us-east-1.amazonaws.com/teams').subscribe(
      (data) => {
        this.filterByState  = data.filter( d => d.state === 'VA');
        console.log(this.filterByState.length);
        for (let i = 0; i < this.filterByState.length; i++) {
          this.filteredRoleArray = this.filterByState[i].members
          .filter( r => {
            r.fullName = r.firstName + ' ' + r.lastName;
            return r.role === 'Technical Lead' || r.role === 'Software Engineer';
          });
          this.result = this.result.concat(this.filteredRoleArray);
        }
        this.users = this.result.sort((a, b) => {
          return a.lastName.localeCompare(b.lastName);
        });
        console.log(this.users);
      }
    );
  }

}

export interface Data {
  name: string;
  city: string;
  state: string;
  members: Member[];
}
export interface Member {
  firstName: string;
  lastName: string;
  role: string;
  fullName?: string;
}

