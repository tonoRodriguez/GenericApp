import React, { useState } from 'react';
import axios from 'axios';

function RegisterProduct() {
    const [productName, setProductName] = useState('');
    const [productNumber, setProductNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/register', { name: productName, number: parseInt(productNumber, 10) });
            setProductName('');  // Reset name input after successful submission
            setProductNumber(''); // Reset number input after successful submission
            alert('Producto registrado con éxito!');
        } catch (error) {
            console.error("Error registering product:", error);
        }
    };

    return (
        <div>
            <h2>Registrar Producto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="Nombre del producto"
                    required
                />
                <input
                    type="number"
                    value={productNumber}
                    onChange={e => setProductNumber(e.target.value)}
                    placeholder="Número del producto"
                    required
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default RegisterProduct;

