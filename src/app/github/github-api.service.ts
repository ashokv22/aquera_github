import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { Repository, RepositoryList } from '../models/repository_model';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(username: string): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Authorization': `token ${environment.apiToken}`
    // });
    return this.http.get(`${environment.apiUrl}/users/${username}`);
  }

  getUserRepositories(username: string, url?: string): Observable<RepositoryList> {
    var apiUrl = `${environment.apiUrl}/users/${username}/repos`;
    // const headers = new HttpHeaders({
    //   'Authorization': `token ${environment.apiToken}`
    // });
    if (url) {
      apiUrl = url;
    } else {
      apiUrl = `${apiUrl}?page=1&per_page=10`; // Default to page 1 with 10 items per page
    }
    return this.http.get<Repository[]>(apiUrl, {
      // headers: headers,
      observe: 'response',
      }).pipe(
        map(response => {
          const linkHeader = response.headers.get('Link');
          const links = linkHeader ? this.parseLinkHeader(linkHeader) : {};
          console.log(links);

          return {
            data: response.body || [],
            nextPageUrl: links.next, 
            prevPageUrl: links.prev
          }
        }));
  }
  

  private parseLinkHeader(header: string): any {
    const links: { [key: string]: string } = {};
    header.split(',').forEach((link: string) => {
      const parts = link.split(';');
      const urlMatch = parts[0].match(/<(.*)>/);
      const url = urlMatch ? urlMatch[1] : '';
      const relMatch = parts[1].match(/rel="(.*)"/);
      const rel = relMatch ? relMatch[1] : '';
      links[rel] = url;
    });
    return links;
  }

}
