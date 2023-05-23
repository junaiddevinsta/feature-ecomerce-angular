import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderWebsiteComponent } from './render-website.component';

describe('RenderWebsiteComponent', () => {
  let component: RenderWebsiteComponent;
  let fixture: ComponentFixture<RenderWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderWebsiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
