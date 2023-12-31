import axios from 'axios';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ProductList from '../ProductsList/ProductList';



function CertifyElement() {

    const [productName, setProductName] = useState('');
    const [productActivo, setProductActivo] = useState('');
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8080/certify', { name: productName,company: "Certificaciones CA", activo: parseInt(productActivo, 10) });
        } catch (error) {
            console.error("Error certyfing product:", error);
        }
    };
    return(
        <div>
            <ProductList/>
            <h2>Certificar Producto</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic" 
                    label="Nombre del producto"
                    variant="outlined"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="Nombre del producto"
                    required
                />
                <TextField
                    label= "Certificas o no?"
                    variant="outlined"
                    value={productActivo}
                    onChange={e => setProductActivo(e.target.value)}
                    placeholder="Certificas o no?"
                    required
                />
                <Button variant="contained" type="submit">Certificar Producto</Button>
            </form>

        </div>
    )
}
export default CertifyElement;