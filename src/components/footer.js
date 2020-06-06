import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="section has-background-info-light">
      <div className="container content">
        <p>Maintained by Arya Das.&nbsp;
          <a href="https://github.com/aryadas98" target="_blank" rel="noopener noreferrer nofollow">
            <span className="icon"><FontAwesomeIcon icon={faGithub} /></span>
          </a>
          <a href="https://twitter.com/aryadas98" target="_blank" rel="noopener noreferrer nofollow">
            <span className="icon"><FontAwesomeIcon icon={faTwitter} /></span>
          </a>
        </p>
        <p>This is just a hobby project and does not guarantee to be accurate.</p>
      </div>
    </footer>
  )
}
