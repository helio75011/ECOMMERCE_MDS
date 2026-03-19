import React, { Component } from "react";
import { Route, Routes } from 'react-router-dom';
import Accueil from './assets/page/Accueil/Accueil.jsx'
import ProductDetail from './assets/components/ProductDetail/ProductDetail.jsx';

class App extends Component {

  render() {
    return (
      <Routes>
        <Route path="/" element={<Accueil />}/>
        <Route path="/product-detail/:id" element={<ProductDetail />} />
      </Routes>
    )
  }
}

export default App
