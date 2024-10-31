import { Component, EventEmitter, Output } from '@angular/core';
import * as Models from '../../models/model.ts';
import { MyServiceService } from '../../my-service.service';
import { Router } from '@angular/router';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-new-announcement-modal',
  templateUrl: './new-announcement-modal.component.html',
  styleUrls: ['./new-announcement-modal.component.css'],
})
export class NewAnnouncementModalComponent {
  @Output() announcementAdded = new EventEmitter<void>(); // Emit an event after announcement is added

  newAnnouncement: Models.AnnouncementRequestDto = {
    credentials: { username: '', password: '' },
    title: '',
    message: '',
  };
  companyId: number | null = null;

  constructor(
    private myService: MyServiceService,
    private router: Router,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    // Get current company ID from service
    this.companyService.selectedCompanyId$.subscribe((id) => {
      this.companyId = id;
    });

    // Retrieve stored credentials and set them in the announcement object
    const credentials = this.myService.getCredentials();
    if (credentials) {
      this.newAnnouncement.credentials = credentials;
    }
  }

  // Method to submit a new announcement
  submitAnnouncement(): void {
    if (this.companyId) {
      this.myService
        .addAnnouncement(this.companyId, this.newAnnouncement)
        .subscribe({
          next: (data) => {
            console.log('Announcement added successfully:', data);
            this.announcementAdded.emit(); // Emit the event when the announcement is added
            this.resetForm(); // Reset form after submission
            // No need to call closeModal() here anymore
          },
          error: (error) => {
            console.error('Error adding announcement:', error);
          },
        });
    }
  }

  // Method to reset the form after submission
  resetForm(): void {
    this.newAnnouncement = {
      credentials: { username: '', password: '' },
      title: '',
      message: '',
    };
  }
}
