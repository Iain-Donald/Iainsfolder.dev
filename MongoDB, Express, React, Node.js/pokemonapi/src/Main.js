// TimeDisplay.js
import React, { useEffect, useState } from 'react';
 
export default () => {
    const [time, setTime] = useState(new Date().toLocaleString());
 
    useEffect(() => {
        const int = setInterval(
            () => setTime(new Date().toLocaleString()),
            1000
        );
 
        return function clearInt() {
            clearInterval(int);
        }
    }, []);
 
    return (
        <div>Current Time: {time}</div>
    );
}

/* 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
...
const someComponent = props => {
    //Note the second argument is an empty array.
    const [responseData, setResponseData] = useState(null);
    useEffect(()=>{
        axios.get('http://www.example.com')
            .then(response=>{setResponseData(response.data)})
    }, []); 
    return(
        <div>
            {responseData}
        </div>
    )
}
*/


/* 
import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default () => {
    const [ message, setMessage ] = useState("Loading...")
    useEffect(()=>{
        axios.get("https://pokeapi.co/")
            .then(res=>setMessage(res.data.message))       
    }, []);
    return (
        <div>
            <h2>Message from the backend: {message}</h2>
        </div>
    )
}
*/





/*
import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default () => {
    const [responseData, setResponseData] = useState(null);
    useEffect(()=>{
        axios.get('https://swapi.dev/api/people/')
            .then(response=>{setResponseData(response.data)})
    }, []); 
    console.log("RESPONSEDATA: " + responseData);
    return(
        <div>
            <h1>TEST</h1>
            {responseData}
        </div>
    )
}
*/