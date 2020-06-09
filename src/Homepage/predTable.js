import React from "react"
import numeral from "numeral"
import moment from "moment"
import { shortTermEnd, longTermDuration, longTermSkip } from "../components/constants"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons"

export default function PredTable({shortTermData,longTermData,term,setTerm}) {

  const formatStr = "0,0";
  const signFormatStr = "+0,0";

  const data = term?longTermData.slice(-longTermDuration/longTermSkip):shortTermData.slice(-shortTermEnd);

  return (
    <>
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <h3 className="is-marginless">Predictions</h3>
          </div>
          <div className="level-item">
            <div className="buttons has-addons are-small">
              <button className={"button " + (!term?" is-info":"")} onClick={()=>setTerm(false)}>Days</button>
              <button className={"button " + (term?" is-info":"")} onClick={()=>setTerm(true)}>Months</button>
            </div>
          </div>
        </div>
      </div>

      { term &&
        <div className="message is-warning">
          <div className="message-body">
            <span className="icon"><FontAwesomeIcon icon={faExclamationTriangle}/></span>
            &nbsp;Long term predictions may not be reliable. Use with caution.
          </div>
        </div>
      }

      <div className="table-container">
        <table className="table is-fullwidth is-bordered is-striped">
          <thead className="thead">
            <tr>
              <th className="has-text-centered has-background-info-light">Date</th>
              <th className="has-text-centered has-background-info-light">T+</th>
              <th className="has-text-centered has-background-info-light">Total</th>
              <th className="has-text-centered has-background-info-light">Active</th>
              <th className="has-text-centered has-background-info-light">Recoveries</th>
              <th className="has-text-centered has-background-info-light">Deaths</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((value,index) =>
                <tr key={index}>
                  <td className="has-text-centered">{value.date.format("DD/MM/YY")}</td>
                  <td className="has-text-centered">{value.date.diff(moment({hours:0}),term?'months':'days')}</td>
                  <td className="has-text-centered">
                    {numeral(value.curr.conf).format(formatStr)}<br />
                    <span className="is-size-7">{numeral(value.delt.conf).format(signFormatStr)}</span>
                  </td>
                  <td className="has-text-centered">
                    {numeral(value.curr.actv).format(formatStr)}<br />
                    <span className="is-size-7">{numeral(value.delt.actv).format(signFormatStr)}</span>
                  </td>
                  <td className="has-text-centered">
                    {numeral(value.curr.recv).format(formatStr)}<br />
                    <span className="is-size-7">{numeral(value.delt.recv).format(signFormatStr)}</span>
                  </td>
                  <td className="has-text-centered">
                    {numeral(value.curr.dead).format(formatStr)}<br />
                    <span className="is-size-7">{numeral(value.delt.dead).format(signFormatStr)}</span>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
