// eslint-disable-next-line no-unused-vars
import { Tabs, Tab } from 'react-tab-view'
import React from 'react';
import './App.css';
import './index.css';
//import {Card} from "reactstrap"
import { Test } from './menu'
// import Updates from './Updates';
//import { utils } from './test';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedTab : 'ANNOUNCEMENTS'
    }
  }

  getDate  = () =>{
    let today = new Date();
    let prev = today.setMonth(today.getMonth() + 1);
    console.log("today",today);
    console.log("prev",prev);
  }

  changeTab =(tab)=> {
    this.setState({selectedTab: tab})
  }
 render(){
  const headers = ['ANNOUNCEMENTS', 'MY VISITS', 'UPDATES']
  return (
    <div className="mainContainer" style={{marginLeft:'60px'}}>

        <div style={{backgroundColor: 'white', paddingBottom: '1px'}}>
          <ul className="tabs">
            {
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
              headers.map(h => <li onClick={()=>this.changeTab(h)} className={this.state.selectedTab === h ? 'selected' : ''}><a>{h}</a></li>)
            }
          </ul>
        </div>
        <div className="page_container">
        {
          this.state.selectedTab === 'ANNOUNCEMENTS' && <div className="tabContainer">
                  <Test/>
          </div>
        }
        {
          this.state.selectedTab === 'MY VISITS' && <div className="tabContainer">
             {/* <Test tab={'MYVISIT'} /> */}
          </div>
        }
        {
          this.state.selectedTab === 'UPDATES' && <div className="tabContainer">
                 {/* <Updates/> */}
          </div>
        }
      </div>
    </div>
  );
 }
}

export default App;
