import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from './components/List';

const SomeComponent = props => {
  //Note the second argument is an empty array.
  const [responseData, setResponseData] = useState(null);
  useEffect(()=>{
      axios.get('https://pokeapi.co/api/v2/pokemon')
          .then(response=>{setResponseData(response.data)})
  }, []);
  var returnArray = new Array;
  if(responseData != null){
    for(let i = 0; i < responseData.results.length; i++){
      //console.log(responseData.results[i].name);
      returnArray.push(responseData.results[i].name + "\n")
    }
    return returnArray;
  }
  return -1;
}

function App() {
  const out = SomeComponent();
  return (
    <div>
      <List output={out}/>
      
      
    </div>
    
  );
}
export default App;