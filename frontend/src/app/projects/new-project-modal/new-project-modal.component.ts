import { Component, EventEmitter, Output } from '@angular/core';
import * as Models from '../../models/model.ts';
import { MyServiceService } from '../../my-service.service';
import { Router } from '@angular/router';
import { CompanyService } from '../../company.service';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css'],
})
export class NewProjectModalComponent {
  @Output() projectAdded = new EventEmitter<void>();
  companyId: number | null = null;
  teamId: number | null = null;
  newProjectRequest: Models.ProjectRequestDto = {
    name: '',
    description: '',
    active: true,
  };

  constructor(
    private myService: MyServiceService,
    private router: Router,
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
  // Method to submit a new announcement
  submitProject(): void {
    if (this.companyId && this.teamId) {
      this.myService
        .addProject(this.companyId, this.teamId, this.newProjectRequest)
        .subscribe({
          next: (data) => {
            console.log('Project added successfully:', data);
            this.projectAdded.emit(); // Emit the event when the project is added
            this.resetForm(); // Reset form after submission
          },
          error: (error) => {
            console.error('Error adding project:', error);
          },
        });
    } else {
      console.error('Company ID or Team ID is missing');
    }
  }

  // Method to reset the form after submission
  resetForm(): void {
    this.newProjectRequest = {
      name: '',
      description: '',
      active: true,
    };
  }
}
