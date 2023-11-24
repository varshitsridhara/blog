import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentService } from '../Services/comment.service';
import { Comment } from '../Models/Blog';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
  renderedComments: Comment[] = [];
  @Output() refreshComments = new EventEmitter<void>();
  destroy$ = new Subject();
  @Input() parentId!: number;
  @Input() blogId!: number;
  isFetching: boolean = false;
  constructor(private commentService: CommentService) { }
  ngOnInit(): void {
    if (this.parentId) this.getSubComments(this.parentId);
  }
  ngOnChanges() {
    if (this.comments.length > 0) {
      this.renderedComments = this.comments;
    }
    console.log(this.renderedComments);
  }
  toggleSubComments(index: number) {
    this.renderedComments[index].showSubComments =
      !this.renderedComments[index].showSubComments;
  }
  getCommentById({ id, type }: { id?: number; type: string }) {
    if (id == null) {
      this.refreshComments.emit();
    } else if (type === 'add') {
      this.commentService
        .getCommentById(id!)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: Comment) => {
          this.renderedComments = this.renderedComments.map((comment) => {
            if (comment.commentId == id) {
              comment = { ...comment, ...data };
            }
            return comment;
          });
        });
    } else if (type === 'delete') {
      this.renderedComments = this.renderedComments.filter((comment) => comment.commentId != id)
    }
  }
  getSubComments(id?: number) {
    console.log(this.parentId);
    this.isFetching = true;
    this.commentService
      .getSubComments(id!)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Comment[]) => {
        {
          this.renderedComments = data;
          this.isFetching = false;
        }
      });
  }
}