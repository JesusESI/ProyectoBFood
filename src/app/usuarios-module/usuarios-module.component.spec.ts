import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosModuleComponent } from './usuarios-module.component';

describe('UsuariosModuleComponent', () => {
  let component: UsuariosModuleComponent;
  let fixture: ComponentFixture<UsuariosModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
