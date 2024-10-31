import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private selectedCompanyIdSource = new BehaviorSubject<number | null>(null);
  selectedCompanyId$ = this.selectedCompanyIdSource.asObservable();

  // Method to update the selected company ID
  setSelectedCompanyId(companyId: number | null): void {
    this.selectedCompanyIdSource.next(companyId);
  }
}
