import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  blogTitle: string = ''; // Variable to store the blog title
  text: string = 'Hello World!';

  publishBlog(): void {
    // Handle the blog publishing logic
    console.log('Blog Title:', this.blogTitle);
    console.log('Blog Content:', this.text);
    // Add logic to send the blog title and content to a service or API
  }
}
