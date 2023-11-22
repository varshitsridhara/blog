import { Component } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  blogList:any=[];

  constructor(private blogservice: BlogService) {}
ngOnInit(){
  this.getBlogs();
}

getBlogs(){
  this.blogservice.GetAllBlogs().subscribe((value)=>{
    
    this.blogList=value;
  })
}
}