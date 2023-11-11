import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarraznoComponent } from './lekarrazno.component';

describe('LekarraznoComponent', () => {
  let component: LekarraznoComponent;
  let fixture: ComponentFixture<LekarraznoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarraznoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarraznoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
