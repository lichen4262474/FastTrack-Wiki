import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { WorkerNavComponent } from './worker-nav/worker-nav.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { TeamsComponent } from './teams/teams.component';
import { NewAnnouncementModalComponent } from './announcements/new-announcement-modal/new-announcement-modal.component';
import { NewTeamModalComponent } from './teams/new-team-modal/new-team-modal.component';
import { AnnouncementCardComponent } from './announcements/announcement-card/announcement-card.component';
import { ProjectsComponent } from './projects/projects.component';
import { NewProjectModalComponent } from './projects/new-project-modal/new-project-modal.component';
import { EditProjectModalComponent } from './projects/edit-project-modal/edit-project-modal.component';
import { UsersComponent } from './users/users.component';
import { NewUserModalComponent } from './users/new-user-modal/new-user-modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompanyComponent,
    AdminNavComponent,
    WorkerNavComponent,
    AnnouncementsComponent,
    TeamsComponent,
    NewAnnouncementModalComponent,
    NewTeamModalComponent,
    AnnouncementCardComponent,
    ProjectsComponent,
    NewProjectModalComponent,
    EditProjectModalComponent,
    UsersComponent,
    NewUserModalComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
