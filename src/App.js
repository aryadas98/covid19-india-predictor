import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Homepage from "./Homepage"
import HowItWorks from "./HowItWorks"
import HelpfulLinks from "./HelpfulLinks"
import DeepDive from "./DeepDive"

import run_engine from "./engine/engine"

export default function App() {
  const [data, setData] = useState({status: "fetching"});

  useEffect(() => {
    async function run() {
      const d = await run_engine();
      setData(d);
    }
    run();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Homepage data={data}/>
        </Route>
        <Route path="/helpful-links/">
          <HelpfulLinks />
        </Route>
        <Route path="/how-it-works/">
          <HowItWorks data={data}/>
        </Route>
        <Route path="/deep-dive/">
          <DeepDive data={data}/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}