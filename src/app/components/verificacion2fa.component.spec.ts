import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verificacion2faComponent } from './verificacion2fa.component';

describe('Verificacion2faComponent', () => {
  let component: Verificacion2faComponent;
  let fixture: ComponentFixture<Verificacion2faComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verificacion2faComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Verificacion2faComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
