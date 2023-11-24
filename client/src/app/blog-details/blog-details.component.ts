import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';
import { CommentService } from '../Services/comment.service';
import { Comment } from '../Models/Blog';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  blogId: number = 0;
  destroy$ = new Subject()
  comments: Comment[] = []
  blog: any;
  isEditing: boolean = false;
  content: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogService, private commentService: CommentService, private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.blogId = +params['id'] || 0;

      // Fetch blog details using the service
      this.blogService.GetBlogById(this.blogId).subscribe(value => {
        this.blog = value;
        this.getComments()
      });
    });
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
