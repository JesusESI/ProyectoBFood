import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalModuleComponent } from './principal-module.component';

describe('PrincipalModuleComponent', () => {
  let component: PrincipalModuleComponent;
  let fixture: ComponentFixture<PrincipalModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
