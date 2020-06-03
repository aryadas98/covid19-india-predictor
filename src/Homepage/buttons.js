import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVirus, faDatabase } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Buttons() {
  return (
    <div className="buttons is-centered">
      
      <a className="button is-light">
        <span className="icon">
          <FontAwesomeIcon icon={faGithub} />
        </span>
        <span>Contribute on GitHub</span>
      </a>

      <a className="button is-light">
        <span className="icon">
          <FontAwesomeIcon icon={faVirus} />
        </span>
        <span>COVID-19 India Tracker</span>
      </a>

      <a className="button is-light">
        <span className="icon">
          <FontAwesomeIcon icon={faDatabase} />
        </span>
        <span>Crowdsourced Patient Database</span>
      </a>
    
    </div>
  )
}