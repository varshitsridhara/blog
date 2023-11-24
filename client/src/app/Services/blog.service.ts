import { HttpClient } from "@angular/common/http";
import { Blog } from "../Models/Blog";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class BlogService{
    GetUserBlogs() {
        return this.http.get<Blog[]>(`${this.blogUrl}/blog/user/blogs`);
        
    }
    private blogUrl = 'https://blogapi20231122150631.azurewebsites.net/api';
    constructor(private http: HttpClient)    {
    }

    

    blogs : Blog[] = [
        
    ]

    GetAllBlogs(): Observable<Blog[]>{
        return this.http.get<Blog[]>(`${this.blogUrl}/blog`);
        // return this.http.get(`${this.blogUrl}/blog`);
    }
    GetBlogById(id: number){
        return this.http.get<Blog>(`${this.blogUrl}/blog/${id}`)
    }
    createNewPost(newPost:any): Observable<any> {     
        return this.http.post(`${this.blogUrl}/blog`, newPost);   
    }

    EditBlog(id: number,title:string,content:string){
        this.http.put(`${this.blogUrl}/blog`,JSON.stringify({id,title,content}));
    }

    UpdateBlog(updatedBlog: any): Observable<any> {     
        const updateUrl = `${this.blogUrl}/blog`; // Adjust the URL accordingly     // Assuming you have an HTTP PUT request to update the blog    
        return this.http.put(updateUrl, updatedBlog);   
    }
    DeleteBlog(id:number){
        return this.http.delete(`${this.blogUrl}/blog/${id}`);
    }
}