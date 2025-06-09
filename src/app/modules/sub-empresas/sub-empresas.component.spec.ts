import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEmpresasComponent } from './sub-empresas.component';

describe('SubEmpresasComponent', () => {
  let component: SubEmpresasComponent;
  let fixture: ComponentFixture<SubEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubEmpresasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
