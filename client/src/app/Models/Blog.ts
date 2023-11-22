export class Blog{

    constructor(id: number, title:string, ownerName: string, content: string){
        this.id=id;
        this.title=title;
        this.ownerName=ownerName;
        this.content=content;
    }
    id: number=0;
    title: string='';
    ownerName: string='';
    content: string='';
}