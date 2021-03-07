import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Top from "./components/Pages/Top"
import TrackInfo from "./components/Pages/TrackInfo"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Top} />
        <Route ecact path="/trackinfo" component={TrackInfo} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
