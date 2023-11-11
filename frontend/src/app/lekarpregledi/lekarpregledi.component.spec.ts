import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LekarpreglediComponent } from './lekarpregledi.component';

describe('LekarpreglediComponent', () => {
  let component: LekarpreglediComponent;
  let fixture: ComponentFixture<LekarpreglediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LekarpreglediComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LekarpreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
