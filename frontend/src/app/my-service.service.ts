import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Models from '../app/models/model.ts';
@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  private apiUrl = 'http://localhost:8080';
  private currentUser: Models.FullUserDto | null = null;
  private credentials: Models.CredentialsDto | null = null;

  constructor(private http: HttpClient) {}

  // Method for logging in a user
  loginUser(
    credentials: Models.CredentialsDto
  ): Observable<Models.FullUserDto> {
    return new Observable((observer) => {
      this.http
        .post<Models.FullUserDto>(`${this.apiUrl}/users/login`, credentials)
        .subscribe({
          next: (user) => {
            this.currentUser = user;
            this.credentials = credentials; // Store credentials
            observer.next(user);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          },
        });
    });
  }

  // Method to store the user data
  setUser(user: Models.FullUserDto): void {
    this.currentUser = user;
  }

  // Method to get the current user data
  getUser(): Models.FullUserDto | null {
    return this.currentUser;
  }

  // Method to clear the current user data
  clearUser(): void {
    this.currentUser = null;
  }
  getCredentials(): Models.CredentialsDto | null {
    return this.credentials; // Return the stored credentials
  }
  // Method to get the user profile
  getUserProfile(userId: number): Observable<Models.ProfileDto> {
    return this.http.get<Models.ProfileDto>(`${this.apiUrl}/users/${userId}`);
  }

  // Get all active users for a given company by company ID
  getCompanyUsers(companyId: number): Observable<Models.FullUserDto[]> {
    return this.http.get<Models.FullUserDto[]>(
      `${this.apiUrl}/company/${companyId}/users`
    );
  }

  // Get all non-deleted announcements for a given company by company ID
  getCompanyAnnouncements(
    companyId: number
  ): Observable<Models.AnnouncementDto[]> {
    return this.http.get<Models.AnnouncementDto[]>(
      `${this.apiUrl}/company/${companyId}/announcements`
    );
  }

  // Get all non-deleted teams for a given company by company ID
  getCompanyTeams(companyId: number): Observable<Models.TeamDto[]> {
    return this.http.get<Models.TeamDto[]>(
      `${this.apiUrl}/company/${companyId}/teams`
    );
  }

  // Get all non-deleted projects for a given company's team
  getTeamProjects(
    companyId: number,
    teamId: number
  ): Observable<Models.ProjectDto[]> {
    return this.http.get<Models.ProjectDto[]>(
      `${this.apiUrl}/company/${companyId}/teams/${teamId}/projects`
    );
  }

  // Add new announcement for a company
  addAnnouncement(
    companyId: number,
    announcement: Models.AnnouncementRequestDto
  ): Observable<Models.AnnouncementDto> {
    return this.http.post<Models.AnnouncementDto>(
      `${this.apiUrl}/announcements/${companyId}`,
      announcement
    );
  }

  // Add new team for a company
  addNewTeam(
    companyId: number,
    team: Models.TeamRequestDto
  ): Observable<Models.TeamDto> {
    return this.http.post<Models.TeamDto>(
      `${this.apiUrl}/company/${companyId}/teams`,
      team
    );
  }

  // Add new project for a company
  addProject(
    companyId: number,
    teamId: number,
    project: Models.ProjectRequestDto
  ): Observable<Models.ProjectDto> {
    return this.http.post<Models.ProjectDto>(
      `${this.apiUrl}/company/${companyId}/teams/${teamId}/projects`,
      project
    );
  }

  // Edit an existing project for a company's team using PATCH
  editProject(
    companyId: number,
    teamId: number,
    projectId: number,
    project: Models.ProjectRequestDto // Using ProjectRequestDto for update
  ): Observable<Models.ProjectDto> {
    return this.http.patch<Models.ProjectDto>(
      `${this.apiUrl}/company/${companyId}/teams/${teamId}/projects/${projectId}`,
      project
    );
  }

  //Add a new user to a company
  addUser(
    companyId: number,
    user: Models.UserRequestDto
  ): Observable<Models.FullUserDto> {
    return this.http.post<Models.FullUserDto>(
      `${this.apiUrl}/company/${companyId}/users`,
      user
    );
  }
}
