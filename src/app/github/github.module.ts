import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { GithubApiService } from './github-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { GithubRoutingModule } from './github-routing.module';


@NgModule({
  declarations: [
    ProfileComponent,
    RepositoryListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    GithubRoutingModule
  ],
  providers: [
    GithubApiService
  ],
  exports: [
    ProfileComponent,
    RepositoryListComponent
  ]
})
export class GithubModule { }
