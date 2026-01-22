import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTopicsCategoryPopupComponent } from './manage-topics-category-popup.component';

describe('ManageTopicsCategoryPopupComponent', () => {
  let component: ManageTopicsCategoryPopupComponent;
  let fixture: ComponentFixture<ManageTopicsCategoryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTopicsCategoryPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTopicsCategoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
