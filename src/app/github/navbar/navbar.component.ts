import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubApiService } from '../github-api.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  isUsersFetching: boolean = false;

  filteredUsers: any[] = [];

  searchForm = new FormGroup({
    searchControl: new FormControl('')
  });

  constructor(
    private githubApiService: GithubApiService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.searchForm.get('searchControl')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.isUsersFetching = true;
        this.filteredUsers = []
      }),
      switchMap(value => this.githubApiService.searchUsers(value!))
    ).subscribe(users => {
      this.isUsersFetching = false;
      this.filteredUsers = users;
    });
  }

  redirectToProfile(username: string): void {
    this.router.navigateByUrl(`/profile/${username}`);
  }

  redirectToHome() {
    this.router.navigateByUrl(`/profile/ashokv22`);
  }

}

