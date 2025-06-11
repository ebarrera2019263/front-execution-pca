import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionTwofaComponent } from './verificacion-twofa.component';

describe('VerificacionTwofaComponent', () => {
  let component: VerificacionTwofaComponent;
  let fixture: ComponentFixture<VerificacionTwofaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificacionTwofaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificacionTwofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
