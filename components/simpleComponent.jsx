import React, { Component } from 'react';
class SimpleComponent extends Component {
    // the ctor will be used for state definition to accept data from parent component
    // the "props" represent data to received from the parent component
    constructor(props) {
        super(props);
        // state declaration
        //event-binding to component
        this.state = {  }
    }
    //the render() method encapsulate Dom and its data with behavior
    //this returns the DOM object aka virtual DOM

    render() { 
        return ( 
            <div>
                <h2>The Simple Component!!!!! {this.props.myname}</h2>
                <NewComponent />
            </div>
         );
    }
}
 

class NewComponent extends Component{
    render(){
        return(
            <div>
                <p>The new component</p>
            </div>

        );
    }
}
export default SimpleComponent ;