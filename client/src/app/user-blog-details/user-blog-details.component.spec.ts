import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlogDetailsComponent } from './user-blog-details.component';

describe('UserBlogDetailsComponent', () => {
  let component: UserBlogDetailsComponent;
  let fixture: ComponentFixture<UserBlogDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBlogDetailsComponent]
    });
    fixture = TestBed.createComponent(UserBlogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
