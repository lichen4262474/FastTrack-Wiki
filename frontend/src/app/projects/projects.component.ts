import { Component } from '@angular/core';
import * as Models from '../models/model.ts';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  user: Models.FullUserDto | null = null;
  projects: Models.ProjectDto[] = [];
  companyId: number | null = null;
  teamId: number | null = null;
  errorMessage: string | null = null;
  selectedProject: Models.ProjectDto | null = null;

  constructor(
    private myService: MyServiceService,
    private router: Router,
    private companyService: CompanyService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.user = this.myService.getUser();

    this.companyService.selectedCompanyId$.subscribe((id) => {
      this.companyId = id;
    });
    this.teamService.selectedTeamId$.subscribe((id) => {
      this.teamId = id;
    });
    this.fetchProjects();
  }

  // Method to fetch announcements for the selected company
  fetchProjects(): void {
    if (this.companyId && this.teamId) {
      this.myService.getTeamProjects(this.companyId, this.teamId).subscribe({
        next: (data) => {
          this.projects = data;
          console.log('Projects fetched successfully:', this.projects);
        },
        error: (error) => {
          console.error('Error fetching projects:', error);
        },
      });
    }
  }
  OnProjectAdded() {
    console.log('add project Emittter heard');
    this.fetchProjects();
  }
  // Select a project for editing and open the modal
  editProject(projectId: number): void {
    const projectToEdit = this.projects.find((p) => p.id === projectId);
    if (projectToEdit) {
      this.selectedProject = { ...projectToEdit }; // Create a copy of the project for editing
    }
  }
  // Handle project update from the modal
  onProjectUpdated(): void {
    console.log('edit project Emittter heard');
    this.fetchProjects();
  }
}
