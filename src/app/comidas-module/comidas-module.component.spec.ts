import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidasModuleComponent } from './comidas-module.component';

describe('ComidasModuleComponent', () => {
  let component: ComidasModuleComponent;
  let fixture: ComponentFixture<ComidasModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComidasModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComidasModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
