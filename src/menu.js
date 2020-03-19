import React, { Component } from 'react';
//import ScrollMenu from 'react-horizontal-scrolling-menu';
import './menu.css';
import test from './test'
import ScrollBar from './scroll';
import Annoucments from './announcements';
// eslint-disable-next-line no-unused-vars
import Annoucment from './announcement';
// import { Visits } from './visits/visits'

import {DropdownButton,Dropdown, Button} from 'react-bootstrap' 
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

let visits = [
  {
    title: '#4kjhxfd8',
    status: 'SUBMITTED'
  },
  {
    title: '#4kjhxfd8',
    status: 'PROGRESS'
  },
  {
    title: '#4kjhxfd8',
    status: 'STARTED'
  },
  {
    title: '#4kjhxfd8',
    status: 'SUBMITTED'
  }
]
// list of items
let list = [];
// One item component
// selected prop will be passed
const MenuItem = ({text, selected, onSelect, selectedIndex}) => {
  return (<li
    className={`cards_item`}
    onClick={()=>onSelect()}
    >
    <div className={`card-cal ${selected ? 'card-active' : ''} ${text.isCurrentWeek ? 'current-week': ''}`}>
      <div className={` ${selected ? 'card-active-text' : ''}`}>{text.monthLabel}</div>
      <div className={` ${selected ? 'card-active-text' : ''}`}>{text.startDate.getDate()}-{text.endDate ? new Date(text.endDate).getDate() : ''}</div>
      <div className={` ${text.isCurrentWeek ? 'card-active-text' : ''}`}>{text.isCurrentWeek}</div>
    </div>
    </li>);
};

// All items component
// Important! add unique key
// const Menu = ({list, selected, onSelect}) =>{

// }


/*
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};
*/

//const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
//const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

//const selected = 0;

export class Test extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    list = test();
    //this.menuItems = Menu(list, selected, this.onSelect);
    let cWeek = 1;
   // let defaultSelectedWeek ;
    list.forEach((x,i)=>{
      if(x.isCurrentWeek)
      cWeek = i;
 //HEAD
      //defaultSelectedWeek=1;

    //  defaultSelectedWeek= x;
 //origin/develop
    })
    this.state = {
      selectedindex : cWeek,
      selected: list[cWeek],
      selectedweek: this.getCurrentWeekday(),
      currentWeek: cWeek,
      isSlidingPanelOpen: false 
    }
  }



  onSelect = (key,i) => {
    let today = this.getCurrentWeekday(key);
    this.setState({ selected: key, selectedindex: i, selectedweek : key.isCurrentWeek ? today : 0 });
    console.log(key);
  }

  getCurrentWeekday(){
    if(new Date().getDay() === 0){
      return 6;
    }
    return new Date().getDay()-1;
  }


  selectWeek = (index) => {
    //this.setState({selectedweek: 0});
  }

  availaleEvent = (isavail) => {
    this.setState({isEvent: isavail});
  }

  render() {
    // const { selected } = this.state;
    const startDate = this.state.selected.startDate
    // eslint-disable-next-line no-unused-vars
    const selectedIndex = this.state.selectedindex;
    const calculateMonthDays = () => {
      //30 -- June, November , April , September
      if(new Date().getMonth() === 3 ||  new Date().getMonth() === 5 || new Date().getMonth() === 8 || new Date().getMonth() === 10){
        return 30
      }else if(new Date().getMonth() === 1){
        return 28;
      }else{
        return 31;
      }
    }
    const getWeeks = () => {
      let days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];
      // eslint-disable-next-line no-unused-vars
      let monthDays = calculateMonthDays();
      return (
        <div className="weekdays"> 
          {
            days.map((d,i)=>{
              return <div className={`dayboxes ${ i === this.state.selectedweek ? 'selectedweek' : ''}`} onClick={()=>{this.selectWeek(i)}}  >
                {d} 
                <br/>
                <span>{new Date(new Date(startDate).setHours(i*24)).getDate()}</span>
              </div>
            })
          }          
      </div>
      );
    }
    return (
      <div style={{backgroundColor: 'white',border: 'solid 1px #d3d3d3',minHeight: '700px'}}>
        <div style={{maxWidth:'84.5%',position:'fixed',zIndex: 2, background:"white", borderTop :'0.5px solid rgb(211, 211, 211)'}}>
        <ScrollBar currentweek={this.state.currentWeek}>
        {
          list.map((el,i) => {          
            return <MenuItem text={el} key={`${new Date(el.startDate).getDate()}-${new Date(el.endDate).getDate()}-${i}`} selected={this.state.selectedindex === i} selectedIndex={i} onSelect={()=>this.onSelect(el,i)} />;
          })
        }
        </ScrollBar>
        <button className="float-right margin-r-tight margin-b-tight" onClick={()=>{this.setState({ isSlidingPanelOpen: true })}}>Open Filter</button>
        
        {
          getWeeks()
        }
        </div>
        <div styles={{display: 'flex',alignItems: 'flexStart' ,zIndex: 1}}>
        
        {/* {!this.props.tab && <Annoucment selectedDates={this.state.selected} isEventsAvailable={this.availaleEvent} />} */}
        {/* {!this.props.tab && <Annoucment/>} */}
        {!this.props.tab && <Annoucments 
        selectedDates={this.state.selected} 
        isEventsAvailable={this.availaleEvent}
        isEvents={this.state.isEvent}/> 
        }
        {/* {this.props.tab === 'MYVISIT' && <Visits visits={visits} /> */}
        }
        </div>

        <SlidingPane className='sliding-filter-pane'
          overlayClassName='some-custom-overlay-class'
          isOpen={ this.state.isSlidingPanelOpen }
          onRequestClose={ () => {
              // triggered on "<" on left top click or on outside click
              //this.setState({ isPaneOpen: false });
          }}>
             <div className="">
                <span className="font-20px font-bold">Filters</span>
                <span style={{float:'right'}} className="text-color-green font-14px">CLEAR ALL</span>
                <div>
                  <DropdownButton id="dropdown-item-button" className="padding-b-jumbo padding-t-jumbo" title="Select Zone">
                    <Dropdown.Item as="button">Zone 1</Dropdown.Item>
                    <Dropdown.Item as="button">Zone 2</Dropdown.Item>
                    <Dropdown.Item as="button">Zone 3</Dropdown.Item>
                  </DropdownButton>

                  <DropdownButton id="dropdown-item-button" className="padding-b-jumbo" title="Select Market">
                    <Dropdown.Item as="button">Market 1</Dropdown.Item>
                    <Dropdown.Item as="button">Market 2</Dropdown.Item>
                    <Dropdown.Item as="button">Market 3</Dropdown.Item>
                  </DropdownButton>

                  <DropdownButton id="dropdown-item-button" className="padding-b-jumbo" title="Select Field Consultant">
                    <Dropdown.Item as="button">FC 1</Dropdown.Item>
                    <Dropdown.Item as="button">FC 2</Dropdown.Item>
                    <Dropdown.Item as="button">FC 3</Dropdown.Item>
                  </DropdownButton>
                </div>
             </div> 
             
             <Button className="apply-filters-button font-12px" onClick={()=>{this.setState({ isSlidingPanelOpen: false });}}>APPLY FILTERS</Button>

          </SlidingPane>
      </div>
    );

  }
}