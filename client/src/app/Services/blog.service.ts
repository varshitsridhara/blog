import { HttpClient } from "@angular/common/http";
import { Blog } from "../Models/Blog";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from '../services/user.service';
import { throwError } from 'rxjs';

@Injectable({
    providedIn:"root"
})
export class BlogService{
    private blogUrl = 'https://blogapi20231122150631.azurewebsites.net/api';
    constructor(private http: HttpClient, private userService:UserService)    {
    }
    blogs : Blog[] = [
        new Blog(1, "Blog 1", "John Due", "Blog1 contains info about some random page.", 1),
        new Blog(2, "Blog 1", "John Due", "Blog1 contains info about some random page. ",2),
        new Blog(3, "Blog 1", "John Due", "Blog1 contains info about some random page. ",3),
        new Blog(4, "Blog 1", "John Due", "Blog1 contains info about some random page. ",4),
        new Blog(5, "Blog 1", "John Due", "Blog1 contains info about some random page. ",5)
    ]

    GetAllBlogs(): Observable<Blog[]>{
        return this.http.get<Blog[]>(`${this.blogUrl}/blog`);
        // return this.http.get(`${this.blogUrl}/blog`);
    }
    GetBlogById(id: number){
        return this.http.get(`${this.blogUrl}/blog/${id}`)
    }
    createNewPost(newPost:any): Observable<any> { 
        const userId = this.userService.currentUser;  
        newPost.authorId = userId; 
        return this.http.post(`${this.blogUrl}/blog`, newPost);   
    }

    // EditBlog(id: number,title:string,content:string){
    //     this.http.put(`${this.blogUrl}/blog`,JSON.stringify({id,title,content}));
    // }
    // blog.service.ts

EditBlog(id: number, title: string, content: string): Observable<any> {
    // Get the user ID from the UserService (assuming your UserService has a method to retrieve the current user ID)
    const userId = this.userService.currentUser!.id;
  
    // Check if the current user is the author of the blog post
    const isAuthor = this.blogs.find(blog => blog.id === id && blog.authorId === userId);
  
    if (isAuthor) {
      return this.http.put(`${this.blogUrl}/blog`, { id, title, content });
      
    } else {
      // Handle unauthorized edit (e.g., display a message, throw an error, etc.)
      return throwError({ message: 'Unauthorized edit' });
    }
  }
  
    DeleteBlog(id:number){
        this.http.delete(`${this.blogUrl}/blog/${id}`);
    }
}
