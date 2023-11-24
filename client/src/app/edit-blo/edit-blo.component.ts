import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../Services/blog.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-blo',
  templateUrl: './edit-blo.component.html',
  styleUrls: ['./edit-blo.component.css']
})
export class EditBlogComponent {
title=""
text=""
id=undefined;
Authorized=true;
messages:Message[] =[];

constructor(private blogService:BlogService,private activateRouter:ActivatedRoute,private userService:UserService, private router : Router){
  this.activateRouter.params.subscribe((val)=>{
    const {id}= val;
    this.id=id;
  })
}
ngOnInit(){
  
  this.blogService.GetBlogById(Number(this.id)).subscribe((val:any)=>{

    const isOwner=this.userService.currentUser?.id===val.user.id;
    if(!isOwner){
this.Authorized    =false;}
    this.title=val.title
    this.text=val.content;


  })
}
isUpdateEnabled() : boolean{
  return this.title.trim() !== '' && this.text.trim() !=='';
}

updateBlog() {    
   const updatedBlog = {       
    id: this.id,       
    title: this.title,       
    content: this.text
          // You may want to include other properties if needed    
    };    
    this.blogService.UpdateBlog(updatedBlog).subscribe(
      (response) =>
    {       // Handle the response, e.g., show a success message    
        console.log('Blog updated successfully', response); 
        this.router.navigate(['/user-dashboard']);
    }   ,
    (error:any)=>
    {
      console.error('Error updating blog',error);

    }
    
    );
}
}