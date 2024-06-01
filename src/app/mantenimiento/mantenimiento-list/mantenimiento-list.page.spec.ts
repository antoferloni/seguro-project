import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MantenimientoListPage } from './mantenimiento-list.page';

describe('MantenimientoListPage', () => {
  let component: MantenimientoListPage;
  let fixture: ComponentFixture<MantenimientoListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
