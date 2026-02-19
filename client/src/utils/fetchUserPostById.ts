import type { Post } from "../types/Post"
import api from "./api"

 const fetchUserPostById = async () :Promise<Post[]> =>{
    try{
        const posts = await api.get<Post[]>("post/myPost");
        if(!posts){
             console.error("samtin went wrong weth fetchUserPostById");
        }
        return posts.data;
    } catch(error){
        console.error("samtin went wrong weth fetchUserPostById", error);
        return [];
    }

}

export default fetchUserPostById;