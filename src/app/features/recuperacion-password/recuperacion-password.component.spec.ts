import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionPasswordComponent } from './recuperacion-password.component';

describe('RecuperacionPasswordComponent', () => {
  let component: RecuperacionPasswordComponent;
  let fixture: ComponentFixture<RecuperacionPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperacionPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperacionPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
