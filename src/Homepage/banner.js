import React from "react"
import numeral from "numeral"

export default function Banner({data}) {

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
            <p className="is-size-7">Last Updated:<br />{data.lastUp.fromNow()}</p>
          </div>
        </div>
      </div>

      <div className="level is-uppercase">
        <div className="level-item has-text-centered">
          <div>
            <p className="title has-text-danger-dark">{numeral(data.curr.conf).format(formatStr)}</p>
            <p className="heading has-text-danger-dark">{numeral(data.delt.conf).format(signFormatStr)}</p>
            <p className="heading has-text-danger-dark">Total</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="title has-text-info-dark">{numeral(data.curr.actv).format(formatStr)}</p>
            <p className="heading has-text-info-dark">{numeral(data.delt.actv).format(signFormatStr)}</p>
            <p className="heading has-text-info-dark">Active</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="title has-text-success-dark">{numeral(data.curr.recv).format(formatStr)}</p>
            <p className="heading has-text-success-dark">{numeral(data.delt.recv).format(signFormatStr)}</p>
            <p className="heading has-text-success-dark">Recoveries</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="title has-text-grey">{numeral(data.curr.dead).format(formatStr)}</p>
            <p className="heading has-text-grey">{numeral(data.delt.dead).format(signFormatStr)}</p>
            <p className="heading has-text-grey">Deaths</p>
          </div>
        </div>
      </div>
    </>
  );
}
