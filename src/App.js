// src/App.js

import React from 'react';
import RegisterProduct from './components/RegisterProduct';
import VerifyProduct from './components/VerifyProduct';
import ProductList from './components/ProductList';

function App() {
    return (
        <div>
            <h1>Sistema de Registro de Productos</h1>
            <ProductList/>
            <RegisterProduct />
            <VerifyProduct />
        </div>
    );
}

export default App;
