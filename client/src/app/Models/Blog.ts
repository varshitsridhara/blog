export class Blog{

    constructor(id: number, title:string, ownerName: string, content: string ,authorId: number){
        this.id=id;
        this.title=title;
        this.ownerName=ownerName;
        this.content=content;
        this.authorId=authorId;   
    }
    id: number=0;
    title: string='';
    ownerName: string='';
    content: string='';
    authorId: number=0;
}
