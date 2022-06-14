import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
export default () => {
    const [ message, setMessage ] = useState("Loading...")
    const { id } =  useParams();
    useEffect(()=>{
        axios.get("http://localhost:8000/api/getByID/" + id)
            .then(res=>{
                setMessage(res.data.user)
            })
    }, [id]);

    let displayPegLeg = "No";
    let displayEyePatch = "No";
    let displayHookHand = "No";

    if(message.pegLeg)displayPegLeg = "Yes";
    if(message.eyePatch)displayEyePatch = "Yes";
    if(message.hookHand)displayHookHand = "Yes";

    return (
        <div>
            <p>
                <Link to="/">Crew Board</Link>
            </p>
            <h2 class='header'>{message.pirateName}</h2>
            <div class='bodyContent'>
                <div class='displayLeft'>
                    <img src={message.imageURL} alt={message.imageURL} width="130" height="130"></img>
                    <h4>"{message.piratePhrase}"</h4>
                </div>
                <div class='displayRight'>
                    <h2>About</h2>
                    <h4>Position: {message.crewPosition}</h4>
                    <h4>Treasures: {message.chests}</h4>
                    <h4>Peg Leg: {displayPegLeg}</h4>
                    <h4>Eye Patch: {displayEyePatch}</h4>
                    <h4>Hook Hand: {displayHookHand}</h4>
                </div>
            </div>
        </div>
    )
}