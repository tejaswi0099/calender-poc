// 13 months from todays month
// 3 month after thodays month
// Example - Current month -- Feb
//Start Date would be 1 Jan- 2019
//End Date would be 31 May - 2020
function findWeekMonthLabel(startDate = new Date('1/1/2019'), endDate = new Date('12/31/2019')){
    
    //create logic for generate date range
    let sD = new Date();
    let lD = new Date();
    startDate = new Date(`${new Date(sD.setMonth(sD.getMonth()-12)).getMonth()}/1/${sD.getFullYear()}`)
    endDate = new Date(`${new Date(lD.setMonth(lD.getMonth()+4)).getMonth()}/30/${lD.getFullYear()}`)
    console.log(startDate);
    console.log(endDate);
     //find the first monday of the month
     let monthLyView = [
        
     ]
        // get the first day of year
        while(startDate <= endDate){
           let result = startDate.getDay() === 1 ;
           if(result){
               //pick the date create week and decide the label
                let tObj = {};
                let d = startDate;
               // let x = startDate.getMonth() + 1
                let mDay = calculateMonthDays(d);
                if(dateDiffInDays(startDate,new Date(`${startDate.getMonth()+1}/${mDay}/${startDate.getFullYear()}`)) < 7 && dateDiffInDays(startDate,endDate) > 7){
                    let cmonth = getMonthLabel(startDate.getMonth());
                    let tDate = new Date(startDate);
                    let lastMonth = getMonthLabel(tDate.getMonth()+1);
                    tObj.monthLabel = `${cmonth} - ${lastMonth}`
                    tObj.startDate = new Date(startDate);                    
                    tObj.endDate = new Date(startDate.setHours(startDate.getDay()+(6*24)));
                    console.log(tObj)
                    if(tObj.startDate.getTime() <= new Date().getTime() && tObj.endDate.getTime() >= new Date().getTime()){
                        console.log(tObj)
                        tObj.isCurrentWeek = true;
                    }
                        
                }else{
                    let cmonth = getMonthLabelFull(startDate.getMonth());
                    tObj.monthLabel = `${cmonth}`
                    tObj.startDate = new Date(startDate);                    
                    tObj.endDate = new Date(startDate.setHours(startDate.getHours()+ (6*24)));
                 if( (tObj.startDate.getTime() <= new Date().getTime() && tObj.endDate.getTime() >= new Date().getTime()) || (
                        tObj.endDate.toLocaleDateString() === new Date().toLocaleDateString()
                    ) ){
                        console.log(tObj)
                        tObj.isCurrentWeek = true;
                    }
                        
                }
                monthLyView.push(tObj);
           }else{
            //console.log(startDate);
            startDate.setHours(startDate.getHours()+24);

            //console.log('increamentedDate by 1 day');
            //console.log(startDate);
           }
        }
        console.log(monthLyView);
        return monthLyView;
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


function getMonthLabel(month){
    switch(month%12){
        case 0:
            return 'Jan'
        case 1:
            return 'Feb'
        case 2:
            return 'Mar'
        case 3:
            return 'Apr'
        case 4:
            return 'May'
        case 5:
            return 'Jun'
        case 6:
            return 'July'
        case 7:
            return 'Aug'
        case 8:
            return 'Sep'
        case 9:
            return 'Oct'
        case 10:
            return 'Nov'
        case 11:
            return 'Dec'
        default:
            return 'na'
    }
}
function getMonthLabelFull(month){
    switch(month){
        case 0:
            return 'January'
        case 1:
            return 'February'
        case 2:
            return 'March'
        case 3:
            return 'April'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'July'
        case 7:
            return 'August'
        case 8:
            return 'September'
        case 9:
            return 'October'
        case 10:
            return 'November'
        case 11:
            return 'December'
        default:
            return 'na'
    }
}

function calculateMonthDays (date){
    //30 -- June, November , April , September
    if(new Date(date).getMonth() === 3 ||  new Date(date).getMonth() === 5 || new Date(date).getMonth() === 8 || new Date().getMonth(date) === 10){
      return 30
    }else if(new Date(date).getMonth() === 1){
      return 28;
    }else{
      return 31;
    }
  }
//findWeekMonthLabel()
module.exports =  findWeekMonthLabel;