import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Homepage from "./Homepage"
import HowItWorks from "./HowItWorks"
import HelpfulLinks from "./HelpfulLinks"

import run_engine from "./engine/engine"

export default function App() {
  const [data, setData] = useState({status: "fetching"});
  const [term, setTerm] = useState(localStorage.getItem("term")==="true");

  useEffect(() => {
    async function run() {
      const d = await run_engine();
      setData(d);
    }
    run();
  }, []);

  useEffect(() => {
    localStorage.setItem("term",term);
  },[term]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Homepage data={data} term={term} setTerm={setTerm}/>
        </Route>
        <Route path="/helpful-links/">
          <HelpfulLinks />
        </Route>
        <Route path="/how-it-works/">
          <HowItWorks coeffs={data.coeffs} status={data.status}/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}