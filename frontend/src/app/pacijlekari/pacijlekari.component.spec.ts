import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijlekariComponent } from './pacijlekari.component';

describe('PacijlekariComponent', () => {
  let component: PacijlekariComponent;
  let fixture: ComponentFixture<PacijlekariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacijlekariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacijlekariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
