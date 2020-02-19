import React from 'react';
import './App.css';

class ScrollBar extends React.Component {
 constructor(props){
     super(props);
     this.myRef = React.createRef();
 }

 
fwdClick = () => {
    var container = this.myRef.current;
    this.sideScroll(container,'right',25,100,10);
};


backClick = () => {
    var container = this.myRef.current;
    this.sideScroll(container,'left',25,100,10);
};

  sideScroll = (element,direction,speed,distance,step) => {
    var scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}

 render(){
  return (
    <div className="scrollWidget">
    <div className="leftBar" onClick={this.backClick} >&lt;</div>
        <ul ref={this.myRef} className="items">
            {this.props.children}
        </ul>
    <div className="rightBar" onClick={this.fwdClick} >&gt;</div>      
    </div>
  );
 }
}

export default ScrollBar;
