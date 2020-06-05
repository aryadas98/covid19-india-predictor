import React, { useState } from "react"
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

export default function PredChart({data, known}) {

  const cumdata = data.map(v => ({
    date: +v.date,
    conf: v.curr.conf,
    actv: v.curr.actv,
    recv: v.curr.recv,
    dead: v.curr.dead
  }))

  const deltdata = data.map(v => ({
    date: +v.date,
    conf: v.delt.conf,
    actv: v.delt.actv,
    recv: v.delt.recv,
    dead: v.delt.dead
  }))

  function tooltipFormatter(value) {
    return numeral(value).format("0");
  }

  const lockdowns = [
    "25 March",
    "15 April",
    "4 May",
    "18 May",
    "1 June"
  ]

  const [state, setState] = useState({
    conf: true,
    actv: true,
    recv: true,
    dead: true,
    lock: true,
    now: true,
    scale: false,
    delt: false
  })

  function clickHandler(o) {
    const {dataKey} = o;
    setState(state => ({...state, [dataKey.trim()]: !state[dataKey]}));
  }

  return (
    <div style={{marginBottom: "1rem"}}>
      <p className="notification">
        Click on legend items to toggle visibility of each series. Hover/click on chart to see exact values.
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
            tickFormatter={n => numeral(n).format("0a")}
            domain={[state.scale?1:"auto","auto"]}
            allowDataOverflow
          />
          <CartesianGrid/>
          <Tooltip
            formatter={tooltipFormatter}
            labelFormatter={t => moment(t).format("DD MMM YY")}
            isAnimationActive={false}
          />
          {state.now && <ReferenceLine x={+moment()} stroke="purple" label="Now" />}
          {state.lock && lockdowns.map((l,i) => <ReferenceLine key={i} x={+moment(l,"DD MMMM")} stroke="#363636" label={(i+1)} />)}
          <Legend iconType="circle" onClick={clickHandler}/>
          <Line dataKey={state.conf?"conf":"conf "} stroke="#cc0f35" strokeWidth={2} dot={false} isAnimationActive={false} name="Total" />
          <Line dataKey={state.actv?"actv":"actv "} stroke="#1d72aa" strokeWidth={2} dot={false} isAnimationActive={false} name="Active" />
          <Line dataKey={state.recv?"recv":"recv "} stroke="#257942" strokeWidth={2} dot={false} isAnimationActive={false} name="Recoveries" />
          <Line dataKey={state.dead?"dead":"dead "} stroke="#7a7a7a" strokeWidth={2} dot={false} isAnimationActive={false} name="Deaths" />
          
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
        <h4>Lockdowns</h4>
        <p>25th March: aksdiajsd aisiasdas asoijasdijasdm asiasdim</p>
        <p>25th March: aksdiajsd aisiasdas asoijasdijasdm asiasdim</p>
        <p>25th March: aksdiajsd aisiasdas asoijasdijasdm asiasdim</p>
        <p>25th March: aksdiajsd aisiasdas asoijasdijasdm asiasdim</p>
        <p>25th March: aksdiajsd aisiasdas asoijasdijasdm asiasdim</p>
      </div>
    </div>
  )  
}
