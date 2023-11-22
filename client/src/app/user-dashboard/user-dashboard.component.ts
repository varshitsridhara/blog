import { Component } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  blogList: any=[];
  constructor(private blogservice: BlogService) {}
  ngOnInit(){
    this.getBlogs();
  }

  getBlogs(){
    this.blogservice.GetAllBlogs().subscribe((blogs: Blog[])=>{
    
    this.blogList= blogs;
  })
}

}
