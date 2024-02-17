import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { RepositoryListComponent } from './repository-list/repository-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'repositories/:username', component: RepositoryListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubRoutingModule { }
