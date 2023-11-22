import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  blogs = [
    {
      id: 1,
      title: 'Blog Post 1',
      author: 'John Doe',
      excerpt: 'This is a brief excerpt of Blog Post 1.'
    },
    {
      id: 2,
      title: 'Blog Post 2',
      author: 'Jane Doe',
      excerpt: 'This is a brief excerpt of Blog Post 2.'
    },
    {
      id: 3,
      title: 'Blog Post 3',
      author: 'Mary Doe',
      excerpt: 'This is a brief excerpt of Blog Post 3.'
    },
    {
      id: 4,
      title: 'Blog Post 4',
      author: 'Jane Hue',
      excerpt: 'This is a brief excerpt of Blog Post 4.'
    },
    // Add more blog entries as needed
  ];

}
