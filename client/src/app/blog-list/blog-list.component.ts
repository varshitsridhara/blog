import { Component, Input } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  blogs!:Blog[];
  blogService:any;
  BlogListComponent( blogService:BlogService){
this.blogService=blogService;
  }

  ngOnInit(){
    this.blogService.GetAllBlogs().subscribe((value:Blog[])=>{
      this.blogs=value;
    })
  }
}
