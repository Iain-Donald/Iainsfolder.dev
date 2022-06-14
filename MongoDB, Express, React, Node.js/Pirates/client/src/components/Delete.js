import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';
export default () => {
    const { id } =  useParams();
    useEffect(()=>{
        axios.get("http://localhost:8000/api/" + id + "/delete")
            .then(console.log("DELETED " + id))
            .catch("Error")
    }, []);
    
    return (
        <Navigate to="/" />
    )
}