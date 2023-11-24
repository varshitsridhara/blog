import { Component } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  blogList:any=[];

  constructor(private blogservice: BlogService, private userService:UserService ) {}
ngOnInit(){
  this.getBlogs();
}

getBlogs(){
  this.blogservice.GetAllBlogs().subscribe((value)=>{
    
    this.blogList=value;
  })
}
logout()
{
  this.userService.logout();
}
}
