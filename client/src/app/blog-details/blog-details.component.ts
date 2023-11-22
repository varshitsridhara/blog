import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  blogId: number = 0;
  blog:any ;
  isEditing:boolean=false;

  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.blogId = +params['id'] || 0;

      // Fetch blog details using the service
      this.blogService.GetBlogById(this.blogId).subscribe(value=>{
        this.blog=value;
      });
    });
  }
}
