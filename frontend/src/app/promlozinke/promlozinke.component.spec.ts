import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromlozinkeComponent } from './promlozinke.component';

describe('PromlozinkeComponent', () => {
  let component: PromlozinkeComponent;
  let fixture: ComponentFixture<PromlozinkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromlozinkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromlozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
