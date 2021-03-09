import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Top from "./components/Pages/Top"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Top} />
        {/* <Route exact path="/trackinfo" component={TrackInfo} /> */}
      </Switch>
    </BrowserRouter>
  )
}

export default App;
