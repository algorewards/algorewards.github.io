import './App.css';
import React, { useState, useEffect } from 'react';


import { Navbar } from './modules/Navbar'
import { TextDiv } from './modules/TextDiv'
import { FieldDiv } from './modules/FieldDiv'
import {  TitleDiv } from './modules/TitleDiv'
import { StatisticDiv } from "./modules/StatisticDiv"
import { StatisticDivTimer } from "./modules/StatisticDivTimer"
import { Calculator } from "./modules/Calculator"



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

function App() {
  var response = 0;

  const [data, setData] = useState(0);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    fetch("https://governance.algorand.foundation/api/periods/governance-period-2/")
    .then(response => response.json())
    .then(response => {
      setLoaded(true);
      setData(response);
    });
  
  }, [])
  return (
    <div className="App">
      <Navbar headerText="Algo Governance Reward Calculator"/>
      <TextDiv>
        I was annoyed there was no tool for calculating governance rewards, so enjoy this simple Github-hosted tool. All data is fetched from the Foundation API, and all calculations are done according to information from the Foundation.
      </TextDiv>
      
      <Calculator loaded={loaded} data={data}/>

      <TitleDiv titleText="Governance Period #2 Statistics"/>

      <div className="App-section App-container">
        <div className="App-half App-half-left App-center">
          <StatisticDiv heading="Governor Count" value= {loaded ? data.governor_count : "..loading"}/>
        </div>
        <div className="App-half App-center">
          <StatisticDiv heading="Total Reward Pool" value={loaded ? parseInt(data.algo_amount_in_reward_pool)/1000000 : "..loading"}/>
        </div>
        
        <div className="App-half App-half-left App-center">
          <StatisticDivTimer heading="Time left (D:H:M:S)" value= {loaded ? data.end_datetime : "..loading"}/>
        </div>
        <div className="App-half App-center">
          <StatisticDiv heading="Total Algo Staked" value={loaded ? data.total_committed_stake/1000000  : "..loading"}/>
        </div>
      </div>

      <TextDiv className="App-small">
        If you have suggestions for any improvements, or find any mistakes contact me on Github. This tool was developed in my free time, feel free to drop some change into my ALGO wallet: NDHX5LVEWPC2FY2SSDXNM2VYFVPWTPKSUILU3MCQVZMIQOOPKYT7X4AD2M
      </TextDiv>
      <br/> 
      <TextDiv className="App-small">
        Zvono Bednarcik 2021
      </TextDiv>
    </div>
  );
}

export default App;
