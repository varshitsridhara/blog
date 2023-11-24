import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentService } from '../Services/comment.service';
import {


  Comment
} from './../Models/Blog';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-comment',
  templateUrl: `./comment.component.html`,
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  toggleTextArea() {
    this.showTextArea = !this.showTextArea;
  }
  @Output() refreshParentComments = new EventEmitter<{ id: number, type: 'delete' | 'add' }>();
  @Input() comment!: Comment;
  @Input() blogId!: number;
  @Input() parentCommentId!: number;
  content: string = '';
  destroy$ = new Subject();
  showSubComments: boolean = false;
  showTextArea: boolean = false;
  constructor(private commentService: CommentService, private messageService: MessageService) { }




  deleteComment(comment: Comment) {
    this.commentService.deleteComment(comment.commentId).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.refreshParentComments.emit({ id: comment.commentId, type: 'delete' });

    })
  }
  addComment(comment: Comment) {
    this.commentService.addSubComment({ blogId: comment.blogId, content: this.content, hasSubComment: false, parentCommentId: comment.commentId, commentId: comment.commentId }, comment.commentId).pipe(takeUntil(this.destroy$)).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment Added' });
        this.refreshParentComments.emit({ id: comment.commentId, type: 'add' })
      }

      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to Add Comment. Try Again Later' });
      }

    })

    this.content = "";
  }

}
