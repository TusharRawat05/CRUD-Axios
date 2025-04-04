import React, { useDebugValue } from 'react'
import { useEffect, useState } from 'react';
import { deletePost, getpost } from '../api/PostApi';
import Form from './form';


export const Posts = () => {
    const [post, setPost] = useState([]); 
    const [updatePost, setupdatePost] = useState({
        title:"",
        body:""
    })

    const getPostData = async () => {
      try {
        const res = await getpost();
        console.log(res);
        setPost(res.data); // Update state with API data
      } catch (error) {
        console.error(error);
      }
    };

   
  
    useEffect(() => {
      getPostData();
    }, []);
    // to delete
    const handleDelete=async(id)=>{ // we will be deleting data from api not from ui from display
        try {
            const res=await deletePost(id);
            console.log(res);
            if(res.status===200){
                const updateDeleteUi=post.filter((curr)=>{
                    return curr.id!==id;
                })
                setPost(updateDeleteUi);
            }
            else{
                console.log("failed to delete the data",res.status);
            }

        } catch (error) {
            console.log(error)
            
        }
       
    }
    const handleEdit=(curr)=>{ // handle edit
        setupdatePost(curr)
    }
  
  return (
<>
<section>
    <Form post={post} setPost={setPost } updatePost={updatePost} setupdatePost={setupdatePost}/>
</section>
    <section className='section-post'>
    <ol className="list-decimal list-inside">
  {post.map((curr) => (
    <li key={curr.id} className="list-item">
      <div className="h-[30rem] bg-gray-700 rounded-2xl border-amber-400 p-[2rem] flex flex-col border-l-4">
        <p className="mb-[2rem]">Title: {curr.title}</p>
        <p>Body: {curr.body}</p>
        <div className="mt-auto flex gap-2">
          <button className="bg-blue-500 px-4 py-2 rounded" onClick={()=>handleEdit(curr)}>Edit</button>
          <button className="bg-red-500 px-4 py-2 rounded" onClick={() => handleDelete(curr.id)}>Delete</button>
        </div>
      </div>
    </li>
  ))}
</ol>

    </section>
    </>
  )
}
