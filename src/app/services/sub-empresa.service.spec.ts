import { TestBed } from '@angular/core/testing';

import { SubEmpresaService } from './sub-empresa.service';

describe('SubEmpresaService', () => {
  let service: SubEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
