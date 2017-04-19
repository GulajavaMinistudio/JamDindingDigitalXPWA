import { TestBed, inject } from '@angular/core/testing';

import { DateServicesService } from './date-services.service';

describe('DateServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateServicesService]
    });
  });

  it('should ...', inject([DateServicesService], (service: DateServicesService) => {
    expect(service).toBeTruthy();
  }));
});
