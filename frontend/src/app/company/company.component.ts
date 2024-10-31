import { Component, EventEmitter, Output } from '@angular/core';
import * as Models from '../models/model.ts';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent {
  user: Models.FullUserDto | null = null;
  companies: Models.CompanyDto[] = [];
  selectedCompanyId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private myService: MyServiceService,
    private router: Router,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.user = this.myService.getUser();
    if (this.user) {
      this.companies = this.user.companies;
    } else {
      this.router.navigate(['/login']);
    }
  }

  onCompanySelect(selectedCompanyId: number | null): void {
    if (selectedCompanyId) {
      this.companyService.setSelectedCompanyId(selectedCompanyId);
      this.router.navigate(['home']);
    } else {
      console.error('Company ID is not valid.');
    }
  }
}
