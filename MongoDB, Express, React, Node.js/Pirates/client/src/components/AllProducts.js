import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link 
} from "react-router-dom";
export default () => {
    const [ message, setMessage ] = useState("Loading...")
    useEffect(()=>{
        axios.get("http://localhost:8000/api")
            .then(res=>setMessage(res.data.message))       
    }, []);
    var display = new Array;
    for(var i = 0; i < message.length; i++){
        display.push(message[i]);
    }
    const listItems = display.map((thing) => 
        <tr>
            <div class='contentBlock'>
                <h3>
                    {thing.pirateName}
                </h3>
                <button class='blueButton'>
                    <Link to={"/details/" + thing._id}>View Pirate</Link>
                </button>
                <button class='redButton'>
                    <Link to={"/delete/" + thing._id}>Walk the Plank</Link>
                </button>
            </div>
        </tr>
    );
    return (
        <div id='showPage'>
            <div id='inline'>
                <h2 class='header'>Pirate Crew</h2>
                <p>
                    <button class='blueButton'>
                        <Link to="/addPirate">Add Pirate</Link>
                    </button>
                </p>
            </div>
            <table>{listItems}</table>
        </div>
    )
}