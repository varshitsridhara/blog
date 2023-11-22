export class Blog{

    constructor(id: number, title:string, author: string, content: string, excerpt: string){
        this.id=id;
        this.title=title;
        this.author=author;
        this.content=content;
        this.excerpt=excerpt;
    }
    id: number=0;
    title: string='';
    author: string='';
    content: string='';
    excerpt: string='';
}