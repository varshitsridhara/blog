import { HttpClient } from "@angular/common/http";
import { Blog } from "../Models/Blog";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class BlogService {
    private blogUrl = 'https://blogapi20231122150631.azurewebsites.net/api';
    constructor(private http: HttpClient) {
    }



    blogs: Blog[] = [
        new Blog(1, "Blog 1", "John Due", "Blog1 contains info about some random page. "),
        new Blog(2, "Blog 1", "John Due", "Blog1 contains info about some random page. "),
        new Blog(3, "Blog 1", "John Due", "Blog1 contains info about some random page. "),
        new Blog(4, "Blog 1", "John Due", "Blog1 contains info about some random page. "),
        new Blog(5, "Blog 1", "John Due", "Blog1 contains info about some random page. ")
    ]

    GetAllBlogs(): Observable<Blog[]> {
        return this.http.get<Blog[]>(`${this.blogUrl}/blog`);
        // return this.http.get(`${this.blogUrl}/blog`);
    }
    GetBlogById(id: number) {
        return this.http.get(`${this.blogUrl}/blog/${id}`)
    }
    // // CreateNewPost(id:number, title: string, ownerName:string, content: string)
    // {
    //     // let newPost = new Blog(this.blogs.length + 1,title,ownerName, content)
    //     // this.blogs.push(newPost);
    //     return this.http.post(`${this.blogUrl}/blog`,JSON.stringify({id,title,content}))
    // }
    createNewPost(newPost: any): Observable<any> {
        return this.http.post(`${this.blogUrl}/blog`, newPost);
    }

    EditBlog(id: number, title: string, content: string) {
        this.http.put(`${this.blogUrl}/blog`, JSON.stringify({ id, title, content }));
    }
    DeleteBlog(id: number) {
        this.http.delete(`${this.blogUrl}/blog/${id}`);
    }
}
