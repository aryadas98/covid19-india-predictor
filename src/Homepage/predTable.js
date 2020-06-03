import React, { useState } from "react";
import numeral from "numeral";

export default function PredTable() {
  const [term, setTerm] = useState(false);

  const data = [
    {
      date: "3/6/20",
      tplus: 0,
      total: { curr: 215980, delta: 8796 },
      active: { curr: 104477, delta: 3406 },
      recoveries: { curr: 105448, delta: 5163 },
      deaths: { curr: 6055, delta: 227 }
    },
    {
      date: "3/6/20",
      tplus: 1,
      total: { curr: 215980, delta: 8796 },
      active: { curr: 104477, delta: 3406 },
      recoveries: { curr: 105448, delta: 5163 },
      deaths: { curr: 6055, delta: 227 }
    },
    {
      date: "3/6/20",
      tplus: 2,
      total: { curr: 215980, delta: 8796 },
      active: { curr: 104477, delta: 3406 },
      recoveries: { curr: 105448, delta: 5163 },
      deaths: { curr: 6055, delta: 227 }
    },
    {
      date: "3/6/20",
      tplus: 3,
      total: { curr: 215980, delta: 8796 },
      active: { curr: 104477, delta: 3406 },
      recoveries: { curr: 105448, delta: 5163 },
      deaths: { curr: 6055, delta: 227 }
    },
    {
      date: "3/6/20",
      tplus: 4,
      total: { curr: 215980, delta: 8796 },
      active: { curr: 104477, delta: 3406 },
      recoveries: { curr: 105448, delta: 5163 },
      deaths: { curr: 6055, delta: 227 }
    },
    {
      date: "3/6/20",
      tplus: 5,
      total: { curr: 215980, delta: 8796 },
      active: { curr: 104477, delta: 3406 },
      recoveries: { curr: 105448, delta: 5163 },
      deaths: { curr: 6055, delta: 227 }
    },
    {
      date: "3/6/20",
      tplus: 6,
      total: { curr: 215980, delta: 8796 },
      active: { curr: 104477, delta: 3406 },
      recoveries: { curr: 105448, delta: 5163 },
      deaths: { curr: 6055, delta: 227 }
    },
  ]

  const formatStr = "0,0";
  const signFormatStr = "+0,0";

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

      <div className="table-container">
        <table className="table is-fullwidth">
          <thead className="thead">
            <tr>
              <th className="has-text-centered">Date</th>
              <th className="has-text-centered">T+</th>
              <th className="has-text-centered">Total</th>
              <th className="has-text-centered">Active</th>
              <th className="has-text-centered">Recoveries</th>
              <th className="has-text-centered">Deaths</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(value =>
                <tr>
                  <td className="has-text-centered">{value.date}</td>
                  <td className="has-text-centered">{value.tplus}</td>
                  <td className="has-text-centered">
                    {numeral(value.total.curr).format(formatStr)}<br />
                    <span className="is-size-7">{numeral(value.total.delta).format(signFormatStr)}</span>
                  </td>
                  <td className="has-text-centered">
                    {numeral(value.active.curr).format(formatStr)}<br />
                    <span className="is-size-7">{numeral(value.active.delta).format(signFormatStr)}</span>
                  </td>
                  <td className="has-text-centered">
                    {numeral(value.recoveries.curr).format(formatStr)}<br />
                    <span className="is-size-7">{numeral(value.recoveries.delta).format(signFormatStr)}</span>
                  </td>
                  <td className="has-text-centered">
                    {numeral(value.deaths.curr).format(formatStr)}<br />
                    <span className="is-size-7">{numeral(value.deaths.delta).format(signFormatStr)}</span>
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
