import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Analysis from "./components/Pages/Analysis"
import Top from "./components/Pages/Top"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Top} />
        <Route exact path="/analysis" conponent={Analysis}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
