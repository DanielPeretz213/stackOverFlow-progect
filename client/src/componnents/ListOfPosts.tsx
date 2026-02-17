import React from "react";
import type { Post } from "../types/Post";
import DrawPostItem from "./DrawPostItem/DrawPostItem";
import { useNavigate } from "react-router-dom";
type listOfPostProps = {
    posts: Post[];
    deletePost: (postId: string)=> void;
}

const ListOfPost: React.FC<listOfPostProps> = ({posts, deletePost}:listOfPostProps) => {
    const navigate = useNavigate();
    if(posts.length < 1){
        return <h3>No post yet</h3>
    }
    return(
        <div className="container">
            {posts.map(post => (
                <DrawPostItem
                key={post._id}
                post={post}
                onEdit={(id)=> navigate("")}
                onDelete={(id) => deletePost(id)}
                />
            ))}
        </div>
    );
}

export default ListOfPost;