import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as Models from '../../models/model.ts';
import { MyServiceService } from '../../my-service.service';
import { CompanyService } from '../../company.service';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css'],
})
export class EditProjectModalComponent {
  @Input() project: Models.ProjectDto | null = null; // Allow null
  @Output() projectUpdated = new EventEmitter<void>();
  @Input() user: Models.FullUserDto | null = null;

  companyId: number | null = null;
  teamId: number | null = null;

  constructor(
    private myService: MyServiceService,
    private companyService: CompanyService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    // Get current company ID from service
    this.companyService.selectedCompanyId$.subscribe((id) => {
      this.companyId = id;
    });

    this.teamService.selectedTeamId$.subscribe((id) => {
      this.teamId = id;
    });
  }

  // Handle form submission to update the project
  submitEditProject(): void {
    if (this.project && this.companyId && this.teamId) {
      const projectId = this.project.id;
      const updatedProjectRequest: Models.ProjectRequestDto = {
        name: this.project.name,
        description: this.project.description,
        active: this.project.active,
      };

      this.myService
        .editProject(
          this.companyId,
          this.teamId,
          projectId,
          updatedProjectRequest
        )
        .subscribe({
          next: (updatedProject) => {
            this.projectUpdated.emit();
            console.log('Project updated successfully:', updatedProject);
          },
          error: (error) => {
            console.error('Error updating project:', error);
          },
        });
    }
  }
}
