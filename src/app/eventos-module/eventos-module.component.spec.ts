import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosModuleComponent } from './eventos-module.component';

describe('EventosModuleComponent', () => {
  let component: EventosModuleComponent;
  let fixture: ComponentFixture<EventosModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
