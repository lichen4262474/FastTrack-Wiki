import { Component, Input } from '@angular/core';
import * as Models from '../../models/model.ts';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css'],
})
export class AnnouncementCardComponent {
  @Input() announcement!: Models.AnnouncementDto;
}
