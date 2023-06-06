import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderUserAccountComponent } from './render-user-account.component';

describe('RenderUserAccountComponent', () => {
  let component: RenderUserAccountComponent;
  let fixture: ComponentFixture<RenderUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderUserAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
