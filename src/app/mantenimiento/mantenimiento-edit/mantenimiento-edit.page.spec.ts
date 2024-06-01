import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoEditPage } from './mantenimiento-edit.page';

describe('MantenimientoEditPage', () => {
  let component: MantenimientoEditPage;
  let fixture: ComponentFixture<MantenimientoEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
