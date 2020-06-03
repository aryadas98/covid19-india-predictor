import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom"

export function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <header>
      <nav className="navbar is-spaced has-background-info-light" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item has-text-weight-bold is-uppercase">
              COVID-19 India Predictor
            </Link>

            <a role="button" className={"navbar-burger burger" + (toggle ? " is-active" : "")} // eslint-disable-line
              aria-label="menu" aria-expanded="false" data-target="navbarBasic" onClick={() => setToggle(toggle => !toggle)}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasic" className={"navbar-menu" + (toggle ? " is-active" : "")}>
            <div className="navbar-end">
              <NavLink to="/" className="navbar-item" activeClassName="is-active" exact>Home</NavLink>
              <NavLink to="/how-it-works/" className="navbar-item" activeClassName="is-active">How it Works</NavLink>
              <NavLink to="/helpful-links/" className="navbar-item" activeClassName="is-active">Helpful Links</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
