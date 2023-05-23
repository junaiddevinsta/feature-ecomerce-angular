import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderHomeComponent } from './render-home.component';

describe('RenderHomeComponent', () => {
  let component: RenderHomeComponent;
  let fixture: ComponentFixture<RenderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
