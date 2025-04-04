import React, { useEffect, useState } from 'react'
import { addPost, editPost } from '../api/PostApi';


export default function Form({post,setPost,updatePost,setupdatePost}) {

    const [addData, setaddData] = useState({
        title:"",
        body:"",
    })

    useEffect(()=>{
        updatePost && setaddData({
            title:updatePost.title|| "",
            body:updatePost.body || "",
        })
    },[updatePost])

     let isempty=Object.keys(updatePost).length===0;

    const handleInputChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setaddData((post)=>{
            return{
            ...post,
            [name]:value,
            }
        })
    }
    const addPostData=async()=>{ // adding data in API and it takes time soit will be in Async func
       const res=await addPost(addData);
       if(res.status===201){ // now we are adding data in the ui
        setPost([...post,res.data])
        setaddData({title:"",body:""}); // removing data from input field after submiiting
       }
    }

    const updatePostData=async()=>{
        const res=await editPost(updatePost.id,addData);
        
        setPost((prev)=>{ // prev giving all the prev data in posts
            return prev.map((curr)=>{ // going through all the ids checking for the upadted post 
                return curr.id===res.data.id ? res.data:curr;
            })

        })
        setaddData({title:"",body:""});
        setupdatePost({});



    }
    //form submission
    const handleSubmit=(e)=>{
        e.preventDefault();
        const action=e.nativeEvent.submitter.value;
        if(action==="Add"){
            addPostData();
        }
        else if(action==="Edit"){
            updatePostData();
        }
      

    }
  return (
    <form className='flex gap-2 mt-[4rem] mb-[4rem] bg-gray-500 p-4' onSubmit={handleSubmit} >
        <div className='border-2 border-amber-100 p-2'>
            <label htmlFor="title"></label>
            <input type="text"
                autoComplete="off"
                id='title'
                name="title"
                placeholder='Add title'
                value={addData.title}
                onChange={(e)=>handleInputChange(e)}
             />
        </div>
        <div className='border-2 border-amber-100 p-2'>
            <label htmlFor="body"></label>
            <input type="text" name="body" id="body" placeholder='Add Post' autoComplete='off' 
              value={addData.body}
              onChange={(e)=>handleInputChange(e)}/>
        </div>
        <button className='bg-green-400' type='submit' value={isempty ? "Add" :"Edit"}>{isempty ? "Add" :"Edit"}</button>
    </form>
  )
}
