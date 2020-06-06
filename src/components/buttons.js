import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVirus, faWrench } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Buttons() {
  return (
    <div className="buttons is-centered">
      
      <a className="button is-light" href="https://github.com/aryadas98/covid19-india-predictor" target="_blank" rel="noopener noreferrer nofollow">
        <span className="icon">
          <FontAwesomeIcon icon={faGithub} />
        </span>
        <span>Contribute on GitHub</span>
      </a>

      <a className="button is-light" href="https://www.covid19india.org/" target="_blank" rel="noopener noreferrer nofollow">
        <span className="icon">
          <FontAwesomeIcon icon={faVirus} />
        </span>
        <span>COVID-19 India Tracker</span>
      </a>

      <a className="button is-light" href="https://api.covid19india.org/" target="_blank" rel="noopener noreferrer nofollow">
        <span className="icon">
          <FontAwesomeIcon icon={faWrench} />
        </span>
        <span>COVID-19 India API</span>
      </a>
    
    </div>
  )
}