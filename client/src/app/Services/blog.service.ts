import { HttpClient } from "@angular/common/http";
import { Blog } from "../Models/Blog";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class BlogService{
    private blogUrl = 'http://localhost:5073/api';
    constructor(private http: HttpClient)    {
    }

    

    blogs : Blog[] = [
        new Blog(1, "Blog 1", "John Due", "Blog1 contains info about some random page. ","Just the first blog"),
        new Blog(2, "Blog 1", "John Due", "Blog1 contains info about some random page. ","Just the first blog"),
        new Blog(3, "Blog 1", "John Due", "Blog1 contains info about some random page. ","Just the first blog"),
        new Blog(4, "Blog 1", "John Due", "Blog1 contains info about some random page. ","Just the first blog"),
        new Blog(5, "Blog 1", "John Due", "Blog1 contains info about some random page. ","Just the first blog")
    ]

    GetAllBlogs(){
        return this.http.get(`${this.blogUrl}/blog`);
    }
    GetBlogById(id: number){
        return this.http.get(`${this.blogUrl}/blog/${id}`)
    }
    CreateNewPost(id:number, title: string, author:string, content: string, excerpt: string){
       return this.http.post(`${this.blogUrl}/blog`,JSON.stringify({id,title,content}))
    }
    EditBlog(id: number,title:string,content:string){
        this.http.put(`${this.blogUrl}/blog`,JSON.stringify({id,title,content}));
    }
    DeleteBlog(id:number){
        this.http.delete(`${this.blogUrl}/blog/${id}`);
    }
}
