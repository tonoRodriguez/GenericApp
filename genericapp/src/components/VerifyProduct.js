// src/components/RegisterProduct.js

import React, { useState } from 'react';
import axios from 'axios';

function VerifyProduct() {
    const [productName, setProductName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/register', { name: productName });
            setProductName('');  // Reset input after successful submission
            alert('Producto registrado con éxito!');
        } catch (error) {
            console.error("Error registering product:", error);
        }
    };

    return (
        <div>
            <h2>Verificar Producto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="Nombre del producto"
                    required
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default VerifyProduct;
