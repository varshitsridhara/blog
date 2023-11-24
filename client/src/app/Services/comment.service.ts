import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../Models/Blog';
import { catchError, of, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  getCommentById(id: number) {
    return this.http.get<Comment>(`${this.rootUrl}/comment/${id}`);
  }
  readonly rootUrl = 'https://blogapi20231122150631.azurewebsites.net/api';
  constructor(private http: HttpClient, private messageService: MessageService) {

  }
  getCommentsByBlogId(blogId: number) {
    return this.http.get<Comment[]>(`${this.rootUrl}/blog/${blogId}/comments`).pipe(catchError((err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      return of(err)
    }));
  }
  getSubComments(parentCommentId: number) {
    return this.http.get<Comment[]>(`${this.rootUrl}/comment/${parentCommentId}/subcomments`).pipe(catchError((err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      return of(err)
    }));
  }
  addParentComment(comment: any) {
    return this.http.post<boolean>(`${this.rootUrl}/comment/parentcomment`, comment).pipe(catchError((err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      return of(err)
    }));
  }
  addSubComment({ commentId, content, blogId, parentCommentId, hasSubComment }: Comment, id: number) {
    return this.http.post<boolean>(`${this.rootUrl}/comment/${id}/subComment`, { commentId, content, blogId, parentCommentId, hasSubComment }).pipe(catchError((err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      return of(err)
    }));
  }
  deleteComment(commentId: number) {
    return this.http.delete<boolean>(`${this.rootUrl}/comment/${commentId}`).pipe(catchError((err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      return of(err)
    }));
  }
  updateComment(comment: any) {
    return this.http.put<boolean>(`${this.rootUrl}/comment`, comment).pipe(catchError((err) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      return of(err)
    }));
  }
}


