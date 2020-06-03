import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Homepage from "./Homepage"
import HowItWorks from "./HowItWorks"
import HelpfulLinks from "./HelpfulLinks/"

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/helpful-links/">
          <HelpfulLinks />
        </Route>
        <Route path="/how-it-works/">
          <HowItWorks />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}