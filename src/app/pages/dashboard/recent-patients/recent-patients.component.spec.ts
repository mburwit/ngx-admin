import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPatientsComponent } from './recent-patients.component';

describe('RecentPatientsComponent', () => {
  let component: RecentPatientsComponent;
  let fixture: ComponentFixture<RecentPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPatientsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
