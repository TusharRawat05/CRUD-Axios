import axios from 'axios'


 const api=axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
 });

 //get, method

export const getpost=()=>{
    return api.get("/posts");
 }

 //delete method
export const deletePost=(id)=>{
   return api.delete(`/posts/${id}`) // we are passing an id for deletion of the post 
 }


// add method
export const addPost=(post)=>{
   return api.post('/posts',post)
 };

 //put method
 export const editPost=(id,post)=>{
   return api.put(`/posts/${id}`,post)
 }
