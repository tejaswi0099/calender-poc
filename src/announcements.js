import React from 'react';
import Annoucments from './announcement';

const AnnoucmentsBackGround = ({isEvents, selectedDates, isEventsAvailable}) => {
    return (
        <div style={{position: 'relative', marginTop: '700px'}}>
            <Annoucments isEventsAvailable={isEventsAvailable} selectedDates={selectedDates} />
        <div className="weekdays" style={{marginTop: isEvents ? '-511px' : '-486px'}}>
            <div className="dayboxes dayboxes-announcements">

            </div>
            <div className="dayboxes dayboxes-announcements">

            </div>
            <div className="dayboxes dayboxes-announcements">

            </div>
            <div className="dayboxes dayboxes-announcements">
            </div>
            <div className="dayboxes dayboxes-announcements">

            </div>
            <div className="dayboxes dayboxes-announcements">
            </div>
       
        </div>
        </div>        
    )
}

export default AnnoucmentsBackGround;