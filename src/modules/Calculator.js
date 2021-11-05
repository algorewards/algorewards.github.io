import React, { useState } from 'react';
import { TitleDiv } from "./TitleDiv"
import { StatisticDiv } from "./StatisticDiv"

export function Calculator(props) {

  const [field, setField] = useState(0);

  const calculatePart = (userStake, totalStake) => {
    return userStake/totalStake;
  }

  const calculateReward = (userStake, totalStake, rewards) => {
    return calculatePart(userStake, totalStake) * rewards;
  }
  const getDuration = (startTime, endTime) => {
    return  (Date.parse(endTime) - Date.parse(startTime));
  }
  const calculateNonCAPY = (startTime, endTime, totalStake, rewards) => {
    var GovDuration = getDuration(startTime, endTime) * 3.17098e-11;

    return ((calculateReward(1, totalStake, rewards) / GovDuration)*100);
  }
  const stakingReward = (startTime, endTime, totalStake) =>  {
    return (getDuration(startTime, endTime) * 3.17098e-11 * 0.048 * totalStake);
  }

  return (
    <div>
      <TitleDiv titleText="Governance Period #1 Calculator"/>
      <div className="App-center App-section">
          <label>
              Algos Commited:
              <input value={(field >= 0) ? field : 0} onChange={e => setField(e.target.value)} min="0"/>
              ALGO        
          </label>
      </div>

      <div className="App-section App-container">
        <div className="App-half App-half-left App-center">
          <StatisticDiv heading="Your Governance ALGO reward" value= {props.loaded ? calculateReward(field, props.data.total_committed_stake/1000000, parseFloat(props.data.algo_amount_in_reward_pool)/1000000) : "..loading"}/>
        </div>
        <div className="App-half App-center">
          <StatisticDiv heading="Percentage of Total Stake" value={props.loaded ? "" + (calculatePart(field, props.data.total_committed_stake/1000000) * 100).toPrecision(4) + "%" : "..loading"}/>
        </div>
        
        <div className="App-half App-half-left App-center">
          <StatisticDiv heading="Period #1 Governance APY%" value= {props.loaded ? calculateNonCAPY(props.data.start_datetime, props.data.end_datetime , props.data.total_committed_stake/1000000, parseFloat(props.data.algo_amount_in_reward_pool)/1000000) : "..loading"}/>
        </div>
        <div className="App-half App-center">
          <StatisticDiv heading="Regular Staking Rewards" value={props.loaded ?  stakingReward(props.data.start_datetime, props.data.end_datetime, field) : "..loading"}/>
        </div>
        <div className="App-half App-half-left App-center">
          <StatisticDiv heading="Total Period #1 Reward" value= {props.loaded ? calculateReward(field, props.data.total_committed_stake/1000000, parseFloat(props.data.algo_amount_in_reward_pool)/1000000) +  stakingReward(props.data.start_datetime, props.data.end_datetime, field): "..loading"}/>
        </div>
        <div className="App-half App-center">
          <StatisticDiv heading="Total Algo After Period #1" value={props.loaded ?  calculateReward(field, props.data.total_committed_stake/1000000, parseFloat(props.data.algo_amount_in_reward_pool)/1000000) +  stakingReward(props.data.start_datetime, props.data.end_datetime, field) + parseFloat(field): "..loading"}/>
        </div>

      </div>
    </div>
  )
} 