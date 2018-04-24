import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasModuleComponent } from './estadisticas-module.component';

describe('EstadisticasModuleComponent', () => {
  let component: EstadisticasModuleComponent;
  let fixture: ComponentFixture<EstadisticasModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
