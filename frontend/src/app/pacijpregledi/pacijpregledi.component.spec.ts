import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijpreglediComponent } from './pacijpregledi.component';

describe('PacijpreglediComponent', () => {
  let component: PacijpreglediComponent;
  let fixture: ComponentFixture<PacijpreglediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijpreglediComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijpreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
