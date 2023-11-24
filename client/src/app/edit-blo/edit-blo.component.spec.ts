import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBloComponent } from './edit-blo.component';

describe('EditBloComponent', () => {
  let component: EditBloComponent;
  let fixture: ComponentFixture<EditBloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBloComponent]
    });
    fixture = TestBed.createComponent(EditBloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
