import React, { useState, useEffect } from 'react';

function dhm (ms) {
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms = ms % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    const hoursms = ms % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    const minutesms = ms % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    return days + ":" + hours + ":" + minutes + ":" + sec;
}
  
export function StatisticDivTimer(props) {

    const [datestring, setDateString] = useState(0);

    useEffect(()=>{
        let myInterval = setInterval(() => {
            setDateString(
                dhm(Date.parse(props.value) - Date.now())
            )      
        }, 100)
            return ()=> {
                clearInterval(myInterval);
              };
        });

    return (
    <div>
        <div className="App-statistics-body ">
            { datestring ? datestring : props.value}
        </div>
        <div className="App-statistics-head"> 
            {props.heading}
        </div>
        
    </div>    )
}