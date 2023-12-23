import axios from 'axios';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ProductList from "../ProductsList/ProductList";


function CertifyBano() {
    const [productName, setProductName] = useState('');
    const [productActivo, setProductActivo] = useState('');
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8080/banojabonoso', { name: productName,company_bj: "Banos SS", bano_j: parseInt(productActivo, 10) });
        } catch (error) {
            console.error("Error certyfing product:", error);
        }
    };
    return(
        <div>
            <ProductList/>
            <h2>Certificacion Baño</h2>
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
                    label= "Certificas BJ?"
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
export default CertifyBano;