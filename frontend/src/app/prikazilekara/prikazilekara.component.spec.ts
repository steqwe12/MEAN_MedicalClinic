import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazilekaraComponent } from './prikazilekara.component';

describe('PrikazilekaraComponent', () => {
  let component: PrikazilekaraComponent;
  let fixture: ComponentFixture<PrikazilekaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrikazilekaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrikazilekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
