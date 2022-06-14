import React, { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default () => {
    const [title, setTitle] = useState(""); 
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const { id } =  useParams();
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/" + id + "/edit", {
            title,
            price,
            description
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
    return (
        <div>
            <h1>Edit</h1>
        <form onSubmit={onSubmitHandler}>
            <p>
                <label>Title</label><br/>
                <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
            </p>
            <p>
                <label>Price</label><br/>
                <input type="text" onChange={(e)=>setPrice(e.target.value)} value={price}/>
            </p>
            <p>
                <label>Description</label><br/>
                <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}/>
            </p>
            <input type="submit" value="Edit"/>
        </form>
        </div>
    )
}