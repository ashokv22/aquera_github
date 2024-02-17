import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubApiService } from '../github-api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string = "";
  user: any;
  isUserNotFound: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private githubApiService: GithubApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')!;
      this.getUser();
    });
  }

  getUser(): void {
    setTimeout(() => {
      this.githubApiService.getUser(this.username).subscribe({
        next: (user) => {
          console.log(user);
          this.user = user;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.isUserNotFound = true;
        }
      }
      );
    }, 100);
  }

}
