import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XyDhivaComponent } from './xy-dhiva.component';

describe('XyDhivaComponent', () => {
  let component: XyDhivaComponent;
  let fixture: ComponentFixture<XyDhivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XyDhivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XyDhivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
