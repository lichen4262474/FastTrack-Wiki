import { Component } from '@angular/core';
import * as Models from '../models/model.ts';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  user: Models.FullUserDto | null = null;
  announcements: Models.AnnouncementDto[] = [];
  companyId: number | null = null;
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
        this.fetchAnnouncements();
      }
    });
  }

  // Method to fetch announcements for the selected company and sort by time
  fetchAnnouncements(): void {
    if (this.companyId) {
      this.myService.getCompanyAnnouncements(this.companyId).subscribe({
        next: (data) => {
          // Sort announcements by 'date' in descending order (newest first)
          this.announcements = data.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA; // Newest first
          });
          console.log(
            'Announcements fetched and sorted by time:',
            this.announcements
          );
        },
        error: (error) => {
          console.error('Error fetching announcements:', error);
        },
      });
    }
  }
}
