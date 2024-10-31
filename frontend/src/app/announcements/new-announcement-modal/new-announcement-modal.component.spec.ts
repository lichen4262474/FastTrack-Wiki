import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnouncementModalComponent } from './new-announcement-modal.component';

describe('NewAnnouncementModalComponent', () => {
  let component: NewAnnouncementModalComponent;
  let fixture: ComponentFixture<NewAnnouncementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAnnouncementModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnnouncementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
