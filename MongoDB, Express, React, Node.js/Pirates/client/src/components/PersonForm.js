import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
export default () => {
    //keep track of what is being typed via useState hook
    const [pirateName, setName] = useState(""); 
    const [imageURL, setURL] = useState("");
    const [chests, setChests] = useState("");
    const [piratePhrase, setPhrase] = useState("");
    let [crewPosition, setPosition] = useState("");
    let [pegLeg, setPegLeg] = useState(true);
    let [eyePatch, setEyePatch] = useState(true);
    let [hookHand, setHookHand] = useState(true);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]); 

    const onSubmitHandler = e => {
        e.preventDefault();

        if(!pegLeg) pegLeg = false;
        if(!eyePatch) eyePatch = false;
        if(!hookHand) hookHand = false;
        if(crewPosition == "") crewPosition = "First Mate";

        axios.post('http://localhost:8000/api/people', {
            pirateName,
            imageURL,
            chests,
            piratePhrase,
            crewPosition,
            pegLeg,
            eyePatch,
            hookHand
        })
        .then(res=>{
            console.log(res)
            navigate("/");
        }) // If successful, do something with the response. 
        .catch(err=>{
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            const errorArr = []; // Define a temp error array to push the messages in
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                errorArr.push(errorResponse[key].message)
            }
            // Set Errors
            setErrors(errorArr);
        })
    }

    return (
        <div>
            <div id='inline'>
                <h1 class='header'>Add Pirate</h1>
                <button className='blueButton'>
                <Link to="/">Crew Board</Link>
                </button>
            </div>
                <form onSubmit={onSubmitHandler}>
                    <div class='displayCenter'>
                    {errors.map((err, index) => <p id='errorText' key={index}>{err}</p>)}
                    <p>
                        <label>Pirate Name:</label><br/>
                        <input type="text" onChange={(e)=>setName(e.target.value)} value={pirateName}/>
                    </p>
                    <p>
                        <label>Image URL:</label><br/>
                        <input type="text" onChange={(e)=>setURL(e.target.value)} value={imageURL}/>
                    </p>
                    <p>
                        <label># of Treasure Chests:</label><br/>
                        <input type="number" onChange={(e)=>setChests(e.target.value)} value={chests}/>
                    </p>
                    <p>
                        <label>Pirate Catch Phrase:</label><br/>
                        <input type="text" onChange={(e)=>setPhrase(e.target.value)} value={piratePhrase}/>
                    </p>
                    <p>
                        <label>Crew Position:</label><br/>
                        <select onChange={(e)=>setPosition(e.target.value)} value={crewPosition}>
                            <option value="First Mate">First Mate</option>
                            <option value="Quarter Master">Quarter Master</option>
                            <option value="Boatswain">Boatswain</option>
                            <option value="Powder Monkey">Powder Monkey</option>
                        </select>
                    </p>
                    <p>
                        <label>Peg Leg:</label><br/>
                        <input type="checkbox" defaultChecked={true} onChange={(e)=>setPegLeg(e.target.checked)}/>
                    </p>
                    <p>
                        <label>Eye Patch:</label><br/>
                        <input type="checkbox" defaultChecked={true} onChange={(e)=>setEyePatch(e.target.checked)}/>
                    </p>
                    <p>
                        <label>Hook Hand:</label><br/>
                        <input type="checkbox" defaultChecked={true} onChange={(e)=>setHookHand(e.target.checked)}/>
                    </p>
                    <input type="submit" value="Add Pirate"/>
                    </div>
                </form>
                <p>Example img URL: https://www.w3schools.com/html/pic_trulli.jpg</p>
        </div>
    )
}

/* 
<p>
                <Link to="/">Crew Board</Link>
            </p>




            <p>
                <label>Crew Position:</label><br/>
                <input type="text" onChange={(e)=>setPosition(e.target.value)} value={crewPosition}/>
            </p>
*/