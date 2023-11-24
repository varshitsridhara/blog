import { Component, OnInit } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{
  blogList: Blog[]=[];
  text: string='';
  ownerName: string='OwnerNew';
  blogTitle: string='';
  messages:Message[] =[];

  
  constructor(private blogservice: BlogService, private router: Router) {}
  ngOnInit(){
  
    this.loadBlogList();
  }



  loadBlogList() {
    this.blogservice.GetAllBlogs().subscribe((blogs: Blog[])=>{
      this.blogList=blogs;
    })
  }

  publishBlog(): void {

    const newPost = {
      title: this.blogTitle,
      ownerName: this.ownerName,
      content: this.text
    };
     
    this.blogservice.createNewPost(newPost).subscribe((response : any) => {

      console.log('Blog created successfully:', response);
      this.loadBlogList();
      this.router.navigate(['/user-dashboard']);
    },
    (error:any) => {
      // Handle login error
      console.log(error);
      this.messages = [
        { severity: 'error', summary: 'Error', detail: error.error.message },
    ];
    }
  );
  }
  isPublishEnabled() : boolean{
    return this.blogTitle.trim() !== '' && this.text.trim() !=='';
  }

  }
    // this.blogService.CreateNewPost(this.id,this.blogTitle, this.ownerName, this.text);

