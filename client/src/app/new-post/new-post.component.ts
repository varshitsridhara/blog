import { Component, OnInit } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{
  blogList: Blog[]=[];
  text: string='Hello World';
  ownerName: string='OwnerNew';
  blogTitle: string='';
  
  constructor(private blogservice: BlogService) {}
  ngOnInit(){
    this.loadBlogList();
  }



  loadBlogList() {
    this.blogservice.GetAllBlogs().subscribe((blogs: Blog[])=>{
      this.blogList=blogs;
    })
  }

  publishBlog(): void {
    // Handle the blog publishing logic
    console.log('Blog Title:', this.blogTitle);
    console.log('Blog Content:', this.text );

    const newPost: Blog = {
      id: this.blogList.length + 1,
      title: this.blogTitle,
      ownerName: this.ownerName,
      content: this.text
    };
     
    this.blogservice.createNewPost(newPost).subscribe((response) => {
      console.log('Blog created successfully:', response);
      this.loadBlogList();
      
      // Reload the blog list after creating a new post
    
    });
  }

  }
    // this.blogService.CreateNewPost(this.id,this.blogTitle, this.ownerName, this.text);

