import { Component, EventEmitter, Output } from '@angular/core';
import * as Models from '../../models/model.ts';
import { MyServiceService } from '../../my-service.service';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-new-team-modal',
  templateUrl: './new-team-modal.component.html',
  styleUrls: ['./new-team-modal.component.css'],
})
export class NewTeamModalComponent {
  @Output() teamAdded = new EventEmitter<void>(); // Emit an event when a team is added

  newTeam: Models.TeamRequestDto = {
    name: '',
    description: '',
    teammates: [], // Initialize as an empty array for selected teammates
  };

  companyId: number | null = null;
  allUsers: Models.FullUserDto[] = []; // Hold full user DTOs
  allUsersBasic: Models.BasicUserDto[] = []; // Hold basic user DTOs, ensure this is BasicUserDto[]

  constructor(
    private myService: MyServiceService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService.selectedCompanyId$.subscribe((id) => {
      this.companyId = id;
      if (this.companyId) {
        this.fetchAllUsers(); // Fetch users when company ID is set
      }
    });
  }

  // Fetch all users for teammate selection
  fetchAllUsers(): void {
    if (this.companyId) {
      // Ensure companyId is not null
      this.myService.getCompanyUsers(this.companyId).subscribe({
        next: (data) => {
          this.allUsers = data; // Assign fetched users to allUsers
          this.transformToBasicUsers(); // Transform full users to basic users
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
      });
    } else {
      console.error('Company ID is not set. Unable to fetch users.');
    }
  }

  // Method to transform FullUserDto array to BasicUserDto array
  private transformToBasicUsers(): void {
    this.allUsersBasic = this.allUsers.map((fullUser) => ({
      id: fullUser.id,
      profile: fullUser.profile,
      admin: fullUser.admin, // Ensure you're using 'admin' property correctly
      active: fullUser.active,
      status: fullUser.status,
    }));
    console.log(
      'transform full team members to user basic dto: ',
      this.allUsersBasic
    );
  }

  // Method to submit a new team
  submitTeam(): void {
    if (this.companyId) {
      console.log('Submitting team:', this.newTeam); // Log the data being sent
      this.myService.addNewTeam(this.companyId, this.newTeam).subscribe({
        next: (data) => {
          console.log('Team added successfully:', data);
          this.teamAdded.emit(); // Emit event when the team is added
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding team:', error); // Log error details
        },
      });
    }
  }

  // Method to reset the form after submission
  resetForm(): void {
    this.newTeam = {
      name: '',
      description: '',
      teammates: [],
    };
  }

  // Method to handle teammate selection
  onTeammateSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedUserId = Number(selectElement.value);
    const selectedUser = this.allUsersBasic.find(
      (user) => user.id === selectedUserId
    );

    if (selectedUser && !this.newTeam.teammates.includes(selectedUser)) {
      this.newTeam.teammates.push(selectedUser);
    }
  }

  // Method to remove a teammate
  removeTeammate(teammate: Models.BasicUserDto): void {
    this.newTeam.teammates = this.newTeam.teammates.filter(
      (user) => user.id !== teammate.id
    );
  }
}
