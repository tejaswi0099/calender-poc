function findWeekMonthLabel(){
    let startDate = new Date('1/1/2019'),
     endDate = new Date('12/31/2019');
     //find the first monday of the month
     let monthLyView = [
        
     ]
        // get the first day of year
        while(startDate <= endDate){
           let result = startDate.getDay() === '1' ;
           if(result){
               //pick the date create week and decide the label
                let tObj = {};
                let d = startDate.getDay();
                if(d < 7 || d > 24){
                    let cmonth = getMonthLabel(abelstartDate.getMonth());
                    let tDate = new Date(startDate);
                    let lastMonth = getMonthLabel(tDate.getMonth()-1);
                    tObj.monthLabel = `${lastMonth} - ${cmonth}`
                    tObj.startDate = new Date(startDate);                    
                    tObj.endDate = startDate.setDate(startDate.getDay()+7);
                }else{
                    tObj.monthLabel = `${cmonth}`
                    tObj.startDate = new Date(startDate);                    
                    tObj.endDate = startDate.setDate(startDate.getDay()+7);
                }
                monthLyView.push(tObj);
           }else{
            console.log(startDate);
            startDate.setHours(startDate.getHours()+24);
            console.log('increamentedDate by 1 day');
            console.log(startDate);
           }
        }
        console.log(monthLyView);
}
function getMonthLabel(month){
    switch(month){
        case 1:
            return 'jan'
        case 2:
            return 'feb'
        case 3:
            return 'mar'
        case 4:
            return 'apr'
        case 5:
            return 'may'
        case 6:
            return 'june'
        case 7:
            return 'july'
        case 8:
            return 'aug'
        case 9:
            return 'sep'
        case 10:
            return 'oct'
        case 11:
            return 'nov'
        case 12:
            return 'dec'
        default:
            return 'na'
    }
}

findWeekMonthLabel();