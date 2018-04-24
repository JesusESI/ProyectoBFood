import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarModuleComponent } from './registrar-module.component';

describe('RegistrarModuleComponent', () => {
  let component: RegistrarModuleComponent;
  let fixture: ComponentFixture<RegistrarModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
