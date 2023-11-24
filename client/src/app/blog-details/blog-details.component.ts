import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';
import { User } from '../user';
import { UserService } from '../Services/user.service';

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
  blogId: number = 0;
  blog:any ;
  isEditing:boolean=false;
  isCurrentUserAuthor:boolean=false;

  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService ,private userService:UserService, private authService: UserService)
   {
    this.isLoggedIn = this.authService.isLoggedIn()

  }

  ngOnInit() {
   

    this.route.params.subscribe((params) => {
      this.blogId = +params['id'] || 0;

      // Fetch blog details using the service
      this.blogService.GetBlogById(this.blogId).subscribe(value=>{
        this.blog=value;
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
}
