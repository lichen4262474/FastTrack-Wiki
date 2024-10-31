import { Component } from '@angular/core';
import * as Models from '../models/model.ts';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  user: Models.FullUserDto | null = null;
  companyId: number | null = null;
  users: Models.FullUserDto[] = [];
  errorMessage: string | null = null;

  constructor(
    private myService: MyServiceService,
    private router: Router,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.user = this.myService.getUser();
    this.companyService.selectedCompanyId$.subscribe((id) => {
      this.companyId = id; // Update companyId when it changes
      if (this.companyId) {
        this.fetchUsers();
      }
    });
  }

  // Method to fetch users for the selected company
  private fetchUsers(): void {
    if (this.companyId) {
      this.myService.getCompanyUsers(this.companyId).subscribe({
        next: (data) => {
          this.users = data;
          console.log('Users fetched successfully:', this.users);
        },
        error: (error) => {
          console.error('Error fetching Users:', error);
        },
      });
    }
  }
  onUserAdded() {
    this.fetchUsers();
  }
}
