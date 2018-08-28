import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let mockMessageService;
  let heroService: HeroService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
  });

  describe('getHero', () => {
    it('should call get with the correct URL', () => {
      heroService.getHero(4).subscribe();

      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({ id: 4, name: 'Super Dude', strength: 100 });
      httpTestingController.verify();
    });
  });
});