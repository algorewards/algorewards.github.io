import React, { useState } from 'react';

var SI_SYMBOL = ["", "k", "M", "B"];

function abbreviateNumber(number){

    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number;

    if(tier > 3) {
        tier = 3;
    }

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}
export function StatisticDiv(props) {

    const [value, setValue] = useState(0);

    return (
    <div>
        <div className="App-statistics-body ">
            { isNaN(props.value) ? props.value : abbreviateNumber(props.value.toLocaleString()) }
        </div>
        <div className="App-statistics-head"> 
            {props.heading}
        </div>
        
    </div>    )
}