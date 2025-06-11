import { TestBed } from '@angular/core/testing';

import { LoginIntentosService } from './login-intentos.service';

describe('LoginIntentosService', () => {
  let service: LoginIntentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginIntentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
