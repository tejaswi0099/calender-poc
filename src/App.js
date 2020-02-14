import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Card} from "reactstrap"

class App extends React.Component {

  getDate  = () =>{
    let today = new Date();
    let prev = today.setMonth(today.getMonth() + 1);
    console.log("today",today);
    console.log("prev",prev);
  }
 render(){
  return (
    <div className="App">
      {this.getDate()}
    </div>
  );
 }
}

export default App;
