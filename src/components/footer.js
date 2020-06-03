import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="section has-background-info-light">
      <div className="container content">
        <p>Maintained by Arya Das.&nbsp;
          <span className="icon"><FontAwesomeIcon icon={faGithub} /></span>
          <span className="icon"><FontAwesomeIcon icon={faTwitter} /></span>
        </p>
        <p>This site is just a hobby project and does not guarantee to be accurate.</p>
      </div>
    </footer>
  )
}
