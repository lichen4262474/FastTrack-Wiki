import { Component, Input } from '@angular/core';
import * as Models from '../models/model.ts';

@Component({
  selector: 'app-worker-nav',
  templateUrl: './worker-nav.component.html',
  styleUrls: ['./worker-nav.component.css'],
})
export class WorkerNavComponent {
  @Input() user: Models.FullUserDto | null = null;
}
