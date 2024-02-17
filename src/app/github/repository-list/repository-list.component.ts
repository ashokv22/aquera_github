import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubApiService } from '../github-api.service';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent implements OnInit {

  username: string = '';
  repositories: any[] = [];
  totalRepositories: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  loading: boolean = false;
  error: string | null = null;
  nextPageUrl: string | null = null;
  prevPageUrl: string | null = null;

  constructor(private route: ActivatedRoute, private githubApiService: GithubApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')!;
      this.fetchRepositories();
    });
  }

  fetchRepositories(url?: string): void {
    this.loading = true;
    this.error = null;

    this.githubApiService.getUserRepositories(this.username, url)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.repositories = response.data;
          // this.totalRepositories = response.totalCount;
          this.nextPageUrl = response.nextPageUrl;
          this.prevPageUrl = response.prevPageUrl;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to fetch repositories. Please try again later.';
          this.loading = false;
        }
      });
  }

  // onPageChange(event: any) {
  //   this.currentPage = event.pageIndex + 1;
  //   this.fetchRepositories();
  // }

  loadNextPage() {
    console.log('Loading next page');
    if (this.nextPageUrl) {
      this.currentPage += 1;
      console.log('Has Next Page URL');
      this.fetchRepositories(this.nextPageUrl);
    }
  }

  loadPreviousPage() {
    console.log('Loading prev page');
    if (this.prevPageUrl) {
      this.currentPage -= 1;
      console.log('Has Prev Page URL');
      this.fetchRepositories(this.prevPageUrl);
    }
  }

  hasPreviousPage(): boolean {
    return this.prevPageUrl !== null;
  }

  hasNextPage(): boolean {
    return this.nextPageUrl !== null;
  }

}
