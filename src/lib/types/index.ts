

export interface PostListProps{
        posts:Array<{
            id:number;
            title:string;
            description:string;
            content:string;
            createdAt:Date;
            slug:string;
            author:{
                name:string;

            }
        }>
}

export interface PostCardProps{
    post:{
            id:number;
            title:string;
            description:string;
            content:string;
            createdAt:Date;
            slug:string;
            author:{
                name:string;

            }
        }
}

export interface PostContentProps{
    post:{
            id:number;
            title:string;
            description:string;
            content:string;
            createdAt:Date;
            slug:string;
            author:{
                name:string;

            }
        },
        isAuthor:Boolean;
}

export interface DeletePostButtonProps{
    postId:number;
}