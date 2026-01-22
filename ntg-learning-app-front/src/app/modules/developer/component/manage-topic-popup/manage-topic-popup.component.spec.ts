import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTopicPopupComponent } from './manage-topic-popup.component';

describe('ManageTopicPopupComponent', () => {
  let component: ManageTopicPopupComponent;
  let fixture: ComponentFixture<ManageTopicPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTopicPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTopicPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
