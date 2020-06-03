import React from "react"
import numeral from "numeral"

export default function Banner() {

  const data = {
    total: { curr: 207183, delta: 8812 },
    active: { curr: 101058, delta: 4060 },
    recoveries: { curr: 100258, delta: 4531 },
    deaths: { curr: 5829, delta: 221 },
    lastUp: "3 hours ago"
  }

  const formatStr = "0,0";
  const signFormatStr = "+0,0";

  return (
    <>
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <h3 className="is-marginless">Current</h3>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <p className="is-size-7">Last Updated:<br />{data.lastUp}</p>
          </div>
        </div>
      </div>

      <div className="level is-uppercase">
        <div className="level-item has-text-centered">
          <div>
            <p className="title has-text-danger-dark">{numeral(data.total.curr).format(formatStr)}</p>
            <p className="heading has-text-danger-dark">{numeral(data.total.delta).format(signFormatStr)}</p>
            <p className="heading has-text-danger-dark">Total</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="title has-text-info-dark">{numeral(data.active.curr).format(formatStr)}</p>
            <p className="heading has-text-info-dark">{numeral(data.active.delta).format(signFormatStr)}</p>
            <p className="heading has-text-info-dark">Active</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="title has-text-success-dark">{numeral(data.recoveries.curr).format(formatStr)}</p>
            <p className="heading has-text-success-dark">{numeral(data.recoveries.delta).format(signFormatStr)}</p>
            <p className="heading has-text-success-dark">Recoveries</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="title has-text-grey">{numeral(data.deaths.curr).format(formatStr)}</p>
            <p className="heading has-text-grey">{numeral(data.deaths.delta).format(signFormatStr)}</p>
            <p className="heading has-text-grey">Deaths</p>
          </div>
        </div>
      </div>
    </>
  );
}
