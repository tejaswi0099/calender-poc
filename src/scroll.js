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
        if(direction === 'left'){
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

componentDidMount(){
    var container = this.myRef.current;
    const cWeek = this.props.currentweek;
    container.scrollTo(document.getElementsByClassName('current-week')[0])
    //const el = document.getElementsByClassName('current-week')[0];
    container.scrollLeft = 133.35 * (cWeek);
}

 render(){
  return (
    <div className="scrollWidget">
    <div className="leftBar" onClick={this.backClick} ><i class="fa fa-2x fa-angle-left"></i></div>
        <ul ref={this.myRef} className="items">
            {this.props.children}
        </ul>
    <div className="rightBar" onClick={this.fwdClick} ><i class="fa fa-2x fa-angle-right"></i></div>      
    </div>
  );
 }
}

export default ScrollBar;
