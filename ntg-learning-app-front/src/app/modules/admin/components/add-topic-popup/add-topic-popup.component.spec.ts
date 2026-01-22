import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicPopupComponent } from './add-topic-popup.component';

describe('AddTopicPopupComponent', () => {
  let component: AddTopicPopupComponent;
  let fixture: ComponentFixture<AddTopicPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTopicPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTopicPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
