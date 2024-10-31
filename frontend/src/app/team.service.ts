import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private selectedTeamIdSubject = new BehaviorSubject<number | null>(null);
  selectedTeamId$ = this.selectedTeamIdSubject.asObservable();

  setSelectedTeamId(teamId: number): void {
    this.selectedTeamIdSubject.next(teamId);
  }
}
