import React from "react"

export function Fetching() {
  return (
    <div className="message is-warning">
      <div className="message-body">
        Fetching data...
      </div>
    </div>
  )
}

export function Failed() {
  return (
    <div className="message is-danger">
      <div className="message-body">
        Failed to fetch or parse data.
      </div>
    </div>
  )
}