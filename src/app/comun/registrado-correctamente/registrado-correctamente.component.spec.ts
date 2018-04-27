import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistradoCorrectamenteComponent } from './registrado-correctamente.component';

describe('RegistradoCorrectamenteComponent', () => {
  let component: RegistradoCorrectamenteComponent;
  let fixture: ComponentFixture<RegistradoCorrectamenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistradoCorrectamenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistradoCorrectamenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
