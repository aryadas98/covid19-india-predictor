import React, { useState, useEffect } from "react"
import moment from "moment"
import numeral from "numeral"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"

export default function PredChart({shortTermData,longTermData,term}) {

  const data = term?longTermData:shortTermData;

  const cumdata = data.map(v => ({
    date: +v.date,
    conf: v.curr.conf,
    actv: v.curr.actv,
    recv: v.curr.recv,
    dead: v.curr.dead
  }))

  const deltdata = data.map(v => ({
    date: +v.date,
    conf: v.sdelt?v.sdelt.conf:v.delt.conf,
    actv: v.sdelt?v.sdelt.actv:v.delt.actv,
    recv: v.sdelt?v.sdelt.recv:v.delt.recv,
    dead: v.sdelt?v.sdelt.dead:v.delt.dead
  }))

  function tooltipFormatter(value) {
    return numeral(value).format("0");
  }

  const lockdowns = [
    "25 March",
    "15 April",
    "4 May",
    "18 May",
    "1 June",
    "1 July",
    "1 August",
    "1 September"
  ]

  const [state, setState] = useState(
    localStorage.getItem("chartsettings") ? 
    JSON.parse(localStorage.getItem("chartsettings")) :
    {
    conf: true,
    actv: true,
    recv: true,
    dead: true,
    lock: true,
    now: true,
    scale: false,
    delt: false
  })

  useEffect(() => {
    localStorage.setItem("chartsettings",JSON.stringify(state));
  },[state]);

  function clickHandler(o) {
    const {dataKey} = o;
    setState(state => ({...state, [dataKey.trim()]: !state[dataKey]}));
  }

  return (
    <div style={{marginBottom: "1rem"}}>
      <p className="notification">
        <span className="icon"><FontAwesomeIcon icon={faInfoCircle} size="sm"/>&nbsp;</span>
        Click on legend items to toggle visibility. Hover/click on chart to see exact values.
      </p>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={state.delt?deltdata:cumdata}>
          <XAxis
            dataKey="date"
            domain={["auto","auto"]}
            type="number"
            scale="time"
            tickFormatter={t => moment(t).format("DD MMM")}
          />
          <YAxis
            width={40}
            scale={state.scale?"log":"linear"}
            tickFormatter={n => numeral(n).format("0[.][0]a").toUpperCase()}
            domain={[state.scale?1:(d => Math.min(0,Math.floor(d*1.05))),d => Math.floor(d*1.05)]}
            allowDataOverflow
          />
          <CartesianGrid/>
          <Tooltip
            formatter={tooltipFormatter}
            labelFormatter={t => moment(t).format("DD MMM YY")}
            isAnimationActive={false}
          />
          {state.now && <ReferenceLine x={+(moment().subtract(1,'days'))} stroke="purple" label="Now" />}
          {state.lock && lockdowns.map((l,i) => <ReferenceLine key={i} x={+moment(l,"DD MMMM")} stroke="#363636" label={(i+1)} />)}
          <Legend iconType="circle" onClick={clickHandler}/>
          <Line type="monotoneX" dataKey={state.conf?"conf":"conf "} stroke="#cc0f35" strokeWidth={2} dot={false} isAnimationActive={false} name="Total" />
          <Line type="monotoneX" dataKey={state.actv?"actv":"actv "} stroke="#1d72aa" strokeWidth={2} dot={false} isAnimationActive={false} name="Active" />
          <Line type="monotoneX" dataKey={state.recv?"recv":"recv "} stroke="#257942" strokeWidth={2} dot={false} isAnimationActive={false} name="Recoveries" />
          <Line type="monotoneX" dataKey={state.dead?"dead":"dead "} stroke="#7a7a7a" strokeWidth={2} dot={false} isAnimationActive={false} name="Deaths" />
          
          <Line dataKey="lock" stroke="#363636" strokeWidth={2} dot={false} isAnimationActive={false} name="Lockdowns" />
          <Line dataKey="now" stroke="purple" strokeWidth={2} dot={false} isAnimationActive={false} name="Now" />
        </LineChart>
      </ResponsiveContainer>

      <div className="buttons has-addons are-small is-centered" style={{marginTop:"1rem"}}>
        <span style={{marginBottom:"0.5rem",marginRight:"0.5rem"}}>Scale:</span>
        <button className={"button " + (!state.scale?" is-info":"")} onClick={()=>setState(s=>({...s,scale:false}))} disabled={state.delt}>Linear</button>
        <button className={"button " + (state.scale?" is-info":"")} onClick={()=>setState(s=>({...s,scale:true}))} disabled={state.delt}>Log</button>
      </div>

      <div className="buttons has-addons are-small is-centered" style={{marginTop:"1rem"}}>
        <span style={{marginBottom:"0.5rem",marginRight:"0.5rem"}}>Data:</span>
        <button className={"button " + (!state.delt?" is-info":"")} onClick={()=>setState(s=>({...s,delt:false}))}>Cumulative</button>
        <button className={"button " + (state.delt?" is-info":"")} onClick={()=>setState(s=>({...s,scale:false,delt:true}))}>Daily</button>
      </div>
      
      <div className="notification">
        <b>Lockdowns/Unlocks</b>
        <ol>
          <li><b>25 Mar</b>: Almost all factories and services were shut down.</li>
          <li><b>15 Apr</b>: Some relaxations were made. Areas were classified into red, orange and green zones.</li>
          <li><b>4 May</b>: Lockdown was extended for 2 weeks.</li>
          <li><b>18 May</b>: Some more relaxations were made.</li>
          <li><b>1 June</b>: Major relaxations were made.</li>
          <li><b>1 July</b>: Most activities are permitted in areas other than containment areas.</li>
          <li><b>1 August</b>: Night curfew removed. Gyms allowed to open.</li>
          <li><b>1 September</b>: Unlock 4.0</li>
        </ol>
        <p>More info:&nbsp;
          <a href="https://en.wikipedia.org/wiki/COVID-19_pandemic_lockdown_in_India#Timeline" target="_blank" rel="noopener noreferrer nofollow">
            Wikipedia
          </a>
        </p>
      </div>
    </div>
  )  
}
