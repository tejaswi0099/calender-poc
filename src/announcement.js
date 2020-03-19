import React, { Component } from 'react';
import './announcment.css'
import { Link } from 'react-router-dom';

export class Annoucments extends Component{
    constructor(props){
        super(props);
        this.state = {
             data: [
                {
                  "title": "Test Announcement Test Announcement Test Announcement Test Announcement Test Announcement Test Announcement Test Announcement",
                  "type": "SUPR",
                  "AnnouncementID": "announcement_id_1",
                  "predefined_store_type": "All",
                  "startDate": "03/02/2020",
                  "endDate": "03/08/2020",
                },
                {
                  "title": "Test Announcement 2",
                  "type": "PRI1",
                  "AnnouncementID": " announcement_id_2",
                  "predefined_store_type": "FRAN",
                  "startDate": "03/04/2020",
                  "endDate": "03/10/2020"
                },
                {
                  "title":"Test 3",
                  "type": "PRI2",
                  "AnnouncementID": " announcement_id_2",
                  "predefined_store_type": "FRAN",
                  "startDate": "03/05/2020",
                  "endDate": "03/06/2020"
                },
                {
                  "title":"Event at 7-Eleven Dallas",
                  "type": "PRI2",
                  "AnnouncementID": " announcement_id_2",
                  "predefined_store_type": "FRAN",
                  "startDate": "03/01/2020",
                  "endDate": "03/07/2020"
                },
                {
                  "title":"url('https://i.pinimg.com/originals/f4/a6/b7/f4a6b75db4d747aa3d1c3efc86845e65.png')",
                  "type": "PRI2",
                  "AnnouncementID": " announcement_id_2",
                  "predefined_store_type": "FRAN",
                  "startDate": "03/02/2020",
                  "endDate": "03/07/2020",
                  image: true
                },
                {
                  "title":"url('https://i.pinimg.com/originals/f4/a6/b7/f4a6b75db4d747aa3d1c3efc86845e65.png')",
                  "type": "PRI2",
                  "AnnouncementID": " announcement_id_2",
                  "predefined_store_type": "FRAN",
                  "startDate": "03/02/2020",
                  "endDate": "03/07/2020",
                  image: true
                }
              ],
              currentWeek : {
                  startDate: `${this.props.selectedDates.startDate.getMonth()+1}/${this.props.selectedDates.startDate.getDate()}/${this.props.selectedDates.startDate.getFullYear()}`,
                  endDate: `${this.props.selectedDates.endDate.getMonth()+1}/${this.props.selectedDates.endDate.getDate()}/${this.props.selectedDates.endDate.getFullYear()}`
              },
              filterAnnoumentsList : []
            
        }
    }

    componentDidMount(){
        this.filterAnnouments();
    }

    componentWillReceiveProps(prevProps,nextProps){        
        if (prevProps.selectedDates !== this.props.selectedDates)
        this.setState({currentWeek:  {
            startDate: `${prevProps.selectedDates.startDate.getMonth()+1}/${prevProps.selectedDates.startDate.getDate()}/${prevProps.selectedDates.startDate.getFullYear()}`,
            endDate: `${prevProps.selectedDates.endDate.getMonth()+1}/${prevProps.selectedDates.endDate.getDate()}/${prevProps.selectedDates.endDate.getFullYear()}`
        }},()=> this.filterAnnouments());
        
    }

    filterAnnouments = () => {
        const sD= this.state.currentWeek.startDate;
        const eD= this.state.currentWeek.endDate;
        const announcements =  this.state.data.filter(an => {
            if(new Date(eD).getTime() >= new Date( an.startDate).getTime() && new Date(sD).getTime() < new Date(an.endDate).getTime() ){
                return an;
            }
            return null;
        }) 
        this.sortedAnnoucment = this.sortAnnouments(announcements,'type');
        this.sortAnnouments(announcements,'type');
        this.sortAnnouments1(announcements,'type');
        this.setState({filterAnnoumentsList: announcements },()=>this.props.isEventsAvailable(announcements && announcements.length > 0)); 
    }

    sortAnnouments = (array, key) => {
    return array.sort(function(a, b) {
        let x,y;
     if(x === y){
            key = 'title'
        }
         x = a[key];
         y = b[key];

        if (typeof x == "string")
        {
            x = (""+x).toLowerCase(); 
        }
        if (typeof y == "string")
        {
            y = (""+y).toLowerCase();
        }
        

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
    sortAnnouments1 = (array, key) => {
    return array.sort(function(a, b) {
       
        var x = a[key];
        var y = b[key];

        if (typeof x == "string")
        {
            x = (""+x).toLowerCase(); 
        }
        if (typeof y == "string")
        {
            y = (""+y).toLowerCase();
        }
        

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

    calculateWidth = (startDate,endDate) => {

        // verify event is lying in current selected week else hide event
        if(new Date(this.state.currentWeek.startDate).getTime() > new Date(endDate).getTime()){
            return {display: 'none'}
        }
        let x = new Date(this.state.currentWeek.startDate).getTime() - new Date(startDate).getTime();
        //if leftdiffrecence in plus means annoutment is continuing for previous week -  no margin from left
        //if minus then only take left maring
        let leftDiff = 0;
        let leftmargin = 0;
        if(x>0){
            leftDiff = 0;// x / (1000 * 3600 * 24)
        }else{
            leftDiff = x / (1000 * 3600 * 24);
            leftmargin = leftDiff * -1 * 14.5;
        }
        console.log('leftDiff'+leftDiff);
        let x1 = new Date(this.state.currentWeek.endDate).getTime() - new Date(endDate).getTime();
        //if rightdiffrecence in minus means annoutment is continuing for next week
        //if plus then only take right maring
        let righttDiff ;
        if(x1>0){
            righttDiff = x1 / (1000 * 3600 * 24);
        }else{
            righttDiff = 0
        }
        let width = 7 - (leftDiff * -1) - (righttDiff)
        console.log('rightDiff'+righttDiff);
        console.log('width',width)
        return {width:`${width * 14.2}%`,marginLeft: `${Math.floor(leftmargin)}%`,marginRight: '2px' };
    }

     dateDiffInDays = (a, b) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }

    eventStarting = (startDate,endDate) => {
        // if event start date if greater or equal
        // to current week start date and less than end date send true else false
        let isStartinginCurrentWeek = false;
        if(new Date(startDate).getTime() >= new Date(this.state.currentWeek.startDate).getTime() && new Date(startDate).getTime() <= new Date(this.state.currentWeek.endDate).getTime()){
            isStartinginCurrentWeek = true;
        }
        return isStartinginCurrentWeek;
    }

    eventEnding = (startDate, endDate) => {
        // if event end date is less or equal
        // to current week end date and greater than start date send true else false
        let isEndingnCurrentWeek = false;
        if(new Date(endDate).getTime() <= new Date(this.state.currentWeek.endDate).getTime() && new Date(endDate).getTime() >= new Date(startDate).getTime()){
            isEndingnCurrentWeek = true;
        }
        return isEndingnCurrentWeek;
    }

    eventContinue = (startDate, endDate) => {
        // if event start date is less
        // to current week start date and less than end date send true else false
        let isComingFromLastWeek = false;
        if(new Date(startDate).getTime() < new Date(this.state.currentWeek.startDate).getTime()){
            isComingFromLastWeek = true;
        }
        return isComingFromLastWeek;
    }

    getPriorityforAnnoucment = (priority) => {
        switch(priority){
            case 'SUPR':
                return 'superPriority';
            case 'PRI1':
                return 'priority1';
            case 'PRI2':
                return 'priority2';
            case 'PRI3':
                return 'priority3';
            case 'PRI4':
                return 'priority4';
            case 'PRI5':
                return 'priority5';
            case 'IMG':
                return 'pImage';
            default:
                return '';
        }
    }

    getColorCode = (priority) => {
        switch(priority){
            case 'SUPR':
                return '#ffff0099';
            case 'PRI1':
                return 'rgba(255, 165, 0, 0)';
            case 'PRI2':
                return '#fbb6b7';
            case 'PRI3':
                return '#b8e0b9';
            case 'PRI4':
                return '#b6d3fb';
            case 'PRI5':
                return '#80008087';
            case 'IMG':
                return 'pImage';
            default:
                return '';
        }
    }

    getBackgroundColor = (arrowType, priority) => {
        const colorCode = this.getColorCode(priority);
        switch(arrowType){
            case 'LEFT' :
                return {borderRight:`23px solid ${colorCode}`}
            case 'RIGHT' :
                return {borderLeft:`23px solid ${colorCode}`}
            case 'CONTINUE' :
                return {border:`1px solid ${colorCode}`,backgroundColor:`${colorCode}`}
            default:
                return {}
        }
    }

    navigateToAnnouncment= ()=> {
        //this.props.history.push('dashboard/Annoucements')
    }


    render(){        
    
        return (
            <div className="tasklists">
                {
                   this.state.filterAnnoumentsList.map( item =>  <div className={`fullweek ${this.getPriorityforAnnoucment(item.type)}`} style={this.calculateWidth(item.startDate,item.endDate)} onClick={this.navigateToAnnouncment} >
                    
                    {this.eventStarting(item.startDate, item.endDate) && <div className="arrow-left" style={this.getBackgroundColor('LEFT', item.type)} ></div>}                    
                    {!item.image && this.eventContinue(item.startDate, item.endDate) && <div className="Rectangle" style={this.getBackgroundColor('CONTINUE', item.type)}></div>}
                    {!item.image && <Link to={`/dashboard/Annoucements`} className="announceList" style={{width: '90%'}}> <span title={item.title} style={{marginLeft: '2%',marginTop: '15px',maxWidth: '100%',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'}}> {item.title}</span> </Link>}
                    {item.image && <Link to={`/dashboard/Annoucements`} className=""> <span style={{marginTop: '2px'}} title={item.title} ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/7-eleven_logo.svg/1200px-7-eleven_logo.svg.png" alt="logo" width={this.dateDiffInDays(new Date(item.startDate), new Date(item.endDate)) > 1 ? '130' : '95'} height="51" /></span></Link>}
                    {this.eventEnding(item.startDate, item.endDate) && <div className="arrow-right" style={this.getBackgroundColor('RIGHT', item.type)}></div>}
                    
                </div>)
                }
                {/* <div className="fullweek">
    

                    this.state.data.map( item =>  <div className={`fullweek ${this.getPriorityforAnnoucment(item.type)}`} >
                        <span style={{position: 'absolute'}}>{item.title}</span>
                    {this.eventStarting(item.startDate, item.endDate) && <div className="arrow-left" style={this.getBackgroundColor('LEFT', item.type)} ></div>}
                    {this.eventEnding(item.startDate, item.endDate) && <div className="arrow-right" style={this.getBackgroundColor('RIGHT', item.type)}></div>}
                    {this.eventContinue(item.startDate, item.endDate) && <div className="Rectangle" style={this.getBackgroundColor('CONTINUE', item.type)}></div>}
                </div>)
                }
                <div className="fullweek">

 origin/develop
                </div>
                <div className={`oneweek`} >
                    {this.eventStarting('03-2-2020') && <div className="arrow-left"></div>}
                    {this.eventEnding('03-4-2020') && <div className="arrow-right"></div>}
                    {this.eventContinue('02-20-2020','02-20-2020') && <div className="Rectangle"></div>}
                </div>
                <div className="oneweek" style={{width:'14%',marginLeft:'29%'}}>
    
                </div> */}
            </div>
        )
    };
} 







export default Annoucments;