import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconsModuleComponent } from './beacons-module.component';

describe('BeaconsModuleComponent', () => {
  let component: BeaconsModuleComponent;
  let fixture: ComponentFixture<BeaconsModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconsModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
