import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './menu.css';
import test from './test'


// list of items
let list = [];

// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
  return (<div
    className={`menu-item ${selected ? 'active' : ''}`}
    >
      <div>{text.monthLabel}</div>
      <div>{text.startDate.getDate()}-{text.endDate ? new Date(text.endDate).getDate() : ''}</div>
    </div>);
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
  list.map((el,i) => {
    return <MenuItem text={el} key={`${new Date(el.startDate).getDate()}-${new Date(el.endDate).getDate()}-${i}`} selected={selected} />;
  });


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
    this.menuItems = Menu(list, selected);
    this.state = {
      selected : `${new Date(list[0].startDate).getDate()}-${new Date(list[0].endDate).getDate()}-1}`
    }
  }

  

  onSelect = (key,t) => {
    this.setState({ selected: key });
    console.log(t);
  }


  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;
    const selectedRange = this.state.selected!== 0 ? this.state.selected.split("-") : '1-7';
    const startDate = parseInt(selectedRange[0])
    const endDate = parseInt(selectedRange[0])
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
      let section = [];      
      let monthDays = calculateMonthDays();
      section.push(<div>Monday - {startDate}</div>);
      section.push(<div>Tuesday - {startDate%monthDays+1}</div>);
      section.push(<div>Wednesday - {startDate%monthDays+2}</div>);
      section.push(<div>Thursday - {startDate%monthDays+3}</div>);
      section.push(<div>Friday - {startDate%monthDays+4}</div>);
      section.push(<div>Saturday - {startDate%monthDays+5}</div>);
      section.push(<div>Sunday - {startDate%monthDays+6}</div>);  
      return section;    
    }
    return (
      <div className="App">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}          
        />
        <div styles={{display: 'flex',alignItems: 'flexStart'}}>
        {
      getWeeks()
    }
        </div>
  
      </div>
    );

  }
}