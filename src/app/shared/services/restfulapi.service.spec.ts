import { TestBed } from '@angular/core/testing';

import { RestfulapiService } from './restfulapi.service';

describe('RestfulapiService', () => {
  let service: RestfulapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestfulapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
