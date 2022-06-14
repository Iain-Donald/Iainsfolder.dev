import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from "react-router-dom";
    
import { useParams } from "react-router";
  
// SWAPI API
const SWAPI = (subRoute) => {
  //Note the second argument is an empty array.
  const [responseData, setResponseData] = useState(null);
  var routeString = 'https://swapi.dev/api/' + subRoute;
  useEffect(()=>{
      axios.get(routeString) //'https://swapi.dev/api/'
          .then(response=>{setResponseData(response.data)})
  }, []);
  var returnArray = [0, 1, 2];
  if(responseData === null){
    return returnArray;
  } else {
    return responseData;
  }
  return responseData;
}

// RETURN PEOPLE
const People = (props) => {
  const { id } = useParams();

  var LocalSWAPI = SWAPI("people");
  var displayName;
  var height;
  var mass;
  var hairColor;
  var skinColor;

  if(LocalSWAPI.toString() != "0,1,2"){
    console.log("success: " + LocalSWAPI.results);
    displayName = LocalSWAPI.results[id].name.toString();
    height = LocalSWAPI.results[id].height.toString();
    mass = LocalSWAPI.results[id].mass.toString();
    hairColor = LocalSWAPI.results[id].hair_color.toString();
    skinColor = LocalSWAPI.results[id].skin_color.toString();
  } else {
    console.log("error: SWAPI returned null");
  }

  return (
    <div>
      <h1>{displayName}</h1>
      <p><b>Height: </b>{height} cm</p>
      <p><b>Mass: </b>{mass} kg</p>
      <p><b>Hair Color: </b>{hairColor}</p>
      <p><b>Skin Color: </b>{skinColor}</p>
    </div>
  );
}

// RETURN Planets
const Planets = (props) => {
  const { id } = useParams();

  var LocalSWAPI = SWAPI("planets");
  var displayName;
  var climate;
  var terrain;
  var surfaceWater;
  var population;

  if(LocalSWAPI.toString() != "0,1,2"){
    console.log("success: " + LocalSWAPI.results[id].name);
    displayName = LocalSWAPI.results[id].name.toString();
    climate = LocalSWAPI.results[id].climate.toString();
    terrain = LocalSWAPI.results[id].terrain.toString();
    surfaceWater = LocalSWAPI.results[id].surface_water.toString();
    population = LocalSWAPI.results[id].population.toString();
  } else {
    console.log("error: SWAPI returned null");
  }

  return (
    <div>
      <h1>{displayName}</h1>
      <p><b>Climate: </b>{climate}</p>
      <p><b>Terrain: </b>{terrain}</p>
      <p><b>Surface Water: </b>{surfaceWater}</p>
      <p><b>Population: </b>{population}</p>
    </div>
  );
}
var ID = 0;

function setID(id){

}
    
function App() {
  //console.log(SWAPI("people")); //explorer
  return (
    <BrowserRouter>
      <p>
        <Link to="/people/0">People</Link>
        &nbsp;|&nbsp;
        <Link to="/planets/0">Planets</Link>
      </p>
      <Switch>
        <Route path="/people/:id">
          <People />
        </Route>
        <Route path="/planets/:id">
          <Planets />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
    
export default App;