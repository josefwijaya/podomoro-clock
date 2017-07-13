import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Timer from "./components/timer.component"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(
<Provider store={store}>
  <Timer />
</Provider>, app);
