import React, { useState } from  'react';
var fullList = [];

class ListElement{
    constructor(text, isDone) {
        this.text = text;
        this.isDone = isDone
    }

    returnText() {
        return this.text;
    }

    returnIsDone() {
        return this.isDone;
    }

    setIsDone(setBool){
        this.isDone = setBool;
    }
}

const List = (props) => {
    const [text, setText] = useState("");
    const addToList = (e) => {
        e.preventDefault();
        let errorThrown = false;

        if(text === '') {
            document.getElementById("textError").innerHTML = "Text is left blank";
            errorThrown = true;
        }

        const setElement = (e) => {
        
        }
        
        if(!errorThrown) {
            document.getElementById("textError").innerHTML = "";
            const newItem = new ListElement(text, false);
            fullList.push(newItem);
            var listToString = "| \n";
            for(let i = 0; i < fullList.length; i++){
                if(fullList[i].returnIsDone() === false){
                    listToString += fullList[i].returnText();
                } else {
                    listToString += fullList[i].returnText().strike();
                }
                

                listToString += "\n <input type=\"checkbox\" id=\"myCheck\" onclick=\"setElement(" + i + ")\"> | \n";
            }
            console.log(listToString);
            document.getElementById("list").innerHTML = listToString;
        }
    };
    
    return(
        <div display="block">
            <script>
            console.log("hello");
            </script>
        <form onSubmit={ addToList }>
            <div>
                <label>Text: </label> 
                <input type="text" onChange={ (e) => setText(e.target.value) } />
                <p id="textError"></p>
            </div>
            <input type="submit" value="Add" />
        </form>
        <p id="list"></p>
        </div>
    );
};
    
export default List;