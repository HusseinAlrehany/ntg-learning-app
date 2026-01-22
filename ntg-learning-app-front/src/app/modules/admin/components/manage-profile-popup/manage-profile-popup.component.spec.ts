import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfilePopupComponent } from './manage-profile-popup.component';

describe('ManageProfilePopupComponent', () => {
  let component: ManageProfilePopupComponent;
  let fixture: ComponentFixture<ManageProfilePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProfilePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
