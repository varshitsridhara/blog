import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BlogService } from '../Services/blog.service';
import { Blog, Comment } from '../Models/Blog';
import { User } from '../user';
import { UserService } from '../Services/user.service';
import { MessageService } from 'primeng/api';
import { CommentService } from '../Services/comment.service';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  isLoggedIn: boolean;
editPost() {
throw new Error('Method not implemented.');
}
content:string=''
destroy$=new Subject()
  blogId: number = 0;
  blog:any ;
  comments:Comment[]=[]
  isEditing:boolean=false;
  isCurrentUserAuthor:boolean=false;

  constructor(private route: ActivatedRoute,private messageService:MessageService,private commentService:CommentService, private router: Router, private blogService: BlogService ,private userService:UserService, private authService: UserService)
   {
    this.isLoggedIn = this.authService.isLoggedIn()

  }

  ngOnInit() {
   

    this.route.params.subscribe((params) => {
      this.blogId = +params['id'] || 0;

      // Fetch blog details using the service
      this.blogService.GetBlogById(this.blogId).subscribe(value=>{
        this.blog=value;
        this.getComments()
      });
    });
  }

  backToHome() {     
    console.log('IsLoggedIn:', this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {       // Navigate to user-home if logged in      
      this.router.navigate(['/user-home']);     
    } else {       // Navigate to homepage if not logged in      
      this.router.navigate(['/homepage']);     
    }   
   
   
}
getComments() {
  this.commentService.getCommentsByBlogId(this.blogId).pipe(takeUntil(this.destroy$)).subscribe((data) => {
    {
      this.comments = data
    }
  });
}
addComment() {
  this.commentService.addParentComment({ blogId: this.blogId, content: this.content, hasSubComment: false, }).pipe(takeUntil(this.destroy$)).subscribe((data) => {
    if (data) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment Added' });
      this.getComments()
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to Add Comment. Try Again Later' });
    }
  })
  this.content = "";

}

}
