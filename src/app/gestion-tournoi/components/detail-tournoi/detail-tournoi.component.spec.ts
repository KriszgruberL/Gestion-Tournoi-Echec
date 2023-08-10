import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTournoiComponent } from './detail-tournoi.component';

describe('DetailTournoiComponent', () => {
  let component: DetailTournoiComponent;
  let fixture: ComponentFixture<DetailTournoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTournoiComponent]
    });
    fixture = TestBed.createComponent(DetailTournoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
