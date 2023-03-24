import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import App from './App'
import {BlueComponent, RedComponent, GreenComponent} from "./component"

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blue" element={<BlueComponent />} />
        <Route path="/red" element={<RedComponent />} />
        <Route path="/green" element={<GreenComponent />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
