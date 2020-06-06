import React from "react"

export default function Ack() {
  return (
    <div className="message is-warning">
      <div className="message-body">
        This project uses data from&nbsp;
        <a href="https://covid19india.org" target="_blank" rel="noopener noreferrer nofollow">
          https://covid19india.org
        </a>. 
        It would not be possible without their amazing work.
      </div>
    </div>
  )
}