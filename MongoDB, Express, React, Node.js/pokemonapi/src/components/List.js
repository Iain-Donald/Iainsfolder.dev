import React, {Component} from 'react';
class List extends Component{
    constructor(props) {
        super(props);
        this.temp = "props.output";
        this.state = {
            temp: ""
        };
        
    }
    
    render(){
        return (
            <div>
                <button type="submit" onClick={() => { this.setTemp(this.props.output) }}>Fetch Pokemon</button>
                <p>{this.getTemp()}</p>
            </div>
        );
    }

    getTemp(){
        return this.state.temp;
    }

    setTemp(newTemp){
        this.setState({temp: newTemp});
        console.log(this.temp);
    }
}

function change() {
    List.setTemp("-2");
}

export default List;
//<button type={'button'} onClick={document.getElementById('demo').innerHTML = "Date()"}>Click me to display Date and Time.</button>