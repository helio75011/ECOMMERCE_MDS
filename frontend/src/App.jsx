import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Accueil from './assets/page/Accueil/Accueil.jsx'

class App extends Component {
  render() {
      return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Accueil />} />
      </Routes>
    </Router>
  )
  }
}

export default App
