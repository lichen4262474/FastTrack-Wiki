import { Component, EventEmitter, Output } from '@angular/core';
import * as Models from '../../models/model.ts';
import { MyServiceService } from '../../my-service.service';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css'],
})
export class NewUserModalComponent {
  @Output() userAdded = new EventEmitter<void>();
  companyId: number | null = null;

  newUserRequest: Models.UserRequestDto = {
    credentials: {
      username: '',
      password: '',
    },
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    admin: false,
  };

  confirmPassword: string = ''; // New property for confirm password
  errorMessage: string = ''; // Property for error messages

  constructor(
    private myService: MyServiceService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService.selectedCompanyId$.subscribe((id) => {
      this.companyId = id; // Update the company ID when it changes
    });
  }

  updateUsername(email: string): void {
    // Assuming username is derived from the email
    this.newUserRequest.credentials.username = email;
  }

  submitUser(modal: any): void {
    // Validate password
    if (this.newUserRequest.credentials.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match. Please try again.'; // Set error message
      return; // Prevent submission
    } else {
      this.errorMessage = ''; // Clear error message if passwords match
      // Log the new user data before submission for debugging
      console.log('Submitting user:', this.newUserRequest);

      // Check if companyId is available
      if (this.companyId) {
        this.myService.addUser(this.companyId, this.newUserRequest).subscribe({
          next: (data) => {
            console.log('User added successfully:', data);
            this.userAdded.emit();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error adding user:', error);
            this.errorMessage =
              error.error?.message ||
              'An unknown error occurred. Please try again.';
          },
        });
      }
    }
  }

  resetForm(): void {
    this.newUserRequest = {
      credentials: {
        username: '',
        password: '',
      },
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      admin: false,
    };
    this.confirmPassword = '';
  }
}
