import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndManageTopicsComponent } from './view-and-manage-topics.component';

describe('ViewAndManageTopicsComponent', () => {
  let component: ViewAndManageTopicsComponent;
  let fixture: ComponentFixture<ViewAndManageTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAndManageTopicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAndManageTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
