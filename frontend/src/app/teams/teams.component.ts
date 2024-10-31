import { Component } from '@angular/core';
import * as Models from '../models/model.ts';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  user: Models.FullUserDto | null = null;
  teams: Models.TeamDto[] = [];
  companyId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private myService: MyServiceService,
    private router: Router,
    private companyService: CompanyService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.user = this.myService.getUser();
    this.companyService.selectedCompanyId$.subscribe((id) => {
      this.companyId = id; // Update companyId when it changes
      if (this.companyId) {
        this.fetchTeams();
      }
    });
  }

  // Method to fetch teams for the selected company and sort them by name
  private fetchTeams(): void {
    if (this.companyId) {
      this.myService.getCompanyTeams(this.companyId).subscribe({
        next: (data) => {
          this.teams = data.sort((a, b) => a.name.localeCompare(b.name));
          console.log('Teams fetched:', this.teams);
        },
        error: (error) => {
          console.error('Error fetching Teams:', error);
        },
      });
    }
  }

  onTeamSelect(teamId: number): void {
    this.teamService.setSelectedTeamId(teamId);
    this.router.navigate(['/projects']);
  }

  // Add this method to listen for team added event
  onTeamAdded(): void {
    this.fetchTeams();
  }
}
