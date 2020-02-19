import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './menu.css';
import test from './test'
import ScrollBar from './scroll';

// list of items
let list = [];
// One item component
// selected prop will be passed
const MenuItem = ({text, selected, onSelect, selectedIndex}) => {
  return (<li
    className={`cards_item`}
    onClick={()=>onSelect()}
    >
    <div className={`card ${selected ? 'card-active' : ''}`}>
      <div className="">{text.monthLabel}</div>
      <div className="">{text.startDate.getDate()}-{text.endDate ? new Date(text.endDate).getDate() : ''}</div>
    </div>
    </li>);
};

// All items component
// Important! add unique key
// const Menu = ({list, selected, onSelect}) =>{

// }



const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 0;

export class Test extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    list = test();
    //this.menuItems = Menu(list, selected, this.onSelect);
    this.state = {
      selectedindex : 0,
      selected:{}
    }
  }



  onSelect = (key,i) => {
    this.setState({ selected: key, selectedindex: i });
    console.log(key);
  }


  render() {
    const { selected } = this.state;
    const startDate = this.state.selected.startDate
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
      let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      let monthDays = calculateMonthDays();     
      return (
        <div> 
          {
            days.map((d,i)=>{
              return <div>{d} - {new Date(new Date(startDate).setHours(i*24)).getDate()}</div>
            })
          }          
      </div>
      );
    }
    return (
      <div className="App">
        <ScrollBar>
        {
          list.map((el,i) => {
            return <MenuItem text={el} key={`${new Date(el.startDate).getDate()}-${new Date(el.endDate).getDate()}-${i}`} selected={this.state.selectedindex === i} selectedIndex={i} onSelect={()=>this.onSelect(el,i)} />;
          })
        }
        </ScrollBar>
        <div styles={{display: 'flex',alignItems: 'flexStart'}}>
        {
          getWeeks()
        }
        </div>

      </div>
    );

  }
}