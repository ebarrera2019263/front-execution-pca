import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoFactorModalComponent } from './two-factor-modal.component';

describe('TwoFactorModalComponent', () => {
  let component: TwoFactorModalComponent;
  let fixture: ComponentFixture<TwoFactorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoFactorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoFactorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
