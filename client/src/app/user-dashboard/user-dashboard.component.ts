import { Component } from '@angular/core';
import { BlogService } from '../Services/blog.service';
import { Blog } from '../Models/Blog';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  blogList: any=[];
  constructor(private blogservice: BlogService, private router: Router, private userService: UserService) {}
  ngOnInit(){
    this.getBlogs();
  }
  

  getBlogs(){
    this.blogservice.GetUserBlogs().subscribe((blogs: Blog[])=>{
    
    this.blogList= blogs;
    });
  }
  editPage(blogId: number) {
    this.router.navigate(['/edit-blo', blogId]);
  }

  deletePost(blogId: number){
// Ensure the user is the author before allowing deletion    
  const currentUser = this.userService.currentUser;     
  console.log('current user:',currentUser);
  if (currentUser && this.isAuthor(blogId, currentUser.id!)) {       
    this.blogservice.DeleteBlog(blogId).subscribe(
      () => {         // Remove the deleted blog from the local list        
      this.blogList = this.blogList.filter((blog:Blog )=> blog.id !== blogId);       
    },
   ( error:any)=>
   {
    console.error('Error deleting blog',error);
    
   }
    );     
  } 
  else {       
    console.log('You are not authorized to delete this blog.');     }   }   // Helper function to check if the user is the author of a blog  
  
    private isAuthor(blogId: number, userId: number): boolean 
    {  
         const blog = this.blogList.find((blog :Blog)=> blog.id === blogId);    
       return blog  && blog.userId === userId;  
       } 
  

logout()
{
   this.userService.logout();
}
}