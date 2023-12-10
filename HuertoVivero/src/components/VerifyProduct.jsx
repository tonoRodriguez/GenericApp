import React, { useState } from 'react';
import axios from 'axios';

function VerifyProduct() {
    const [productName, setProductName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Assuming the server expects a POST request for verification
            console.log(productName);
            const response = await axios.post('http://localhost:8080/verify', { name: productName });
            
            // Handle the response here
            console.log(response.data); // You might want to do something with this data

            setProductName('');  // Reset input after successful submission
            alert('Producto verificado con éxito!'); // Update the message accordingly
        } catch (error) {
            console.error("Error al verificar el producto:", error);
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
                <button type="submit">Verificar</button>
            </form>
        </div>
    );
}

export default VerifyProduct;
