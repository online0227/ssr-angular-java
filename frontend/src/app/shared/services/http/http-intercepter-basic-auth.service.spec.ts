import { TestBed } from '@angular/core/testing';

import { HttpIntercepterBasicAuthService } from '@shared/services/http/http-intercepter-basic-auth.service';

describe('HttpIntercepterBasicAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpIntercepterBasicAuthService = TestBed.get(HttpIntercepterBasicAuthService);
    expect(service).toBeTruthy();
  });
});
