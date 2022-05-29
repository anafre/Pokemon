import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeTableFavComponent } from './poke-table-fav.component';

describe('PokeTableFavComponent', () => {
  let component: PokeTableFavComponent;
  let fixture: ComponentFixture<PokeTableFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeTableFavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeTableFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
