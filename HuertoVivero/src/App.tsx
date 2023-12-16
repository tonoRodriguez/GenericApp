// src/App.js

import React from 'react';
import RegisterProduct from './components/RegisterProduct';
import VerifyProduct from './components/VerifyProduct';
import ProductList from './components/ProductList';
import './App.css';
function App() {
    return (
        <div>
            <h1>Compañia frutera</h1>
            <h1>Registro de Productos</h1>
            <ProductList/>
            <RegisterProduct />
            <VerifyProduct />
        </div>
    );
}

export default App;
