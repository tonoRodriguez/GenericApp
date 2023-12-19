// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductListStyle.css'; // Importa el archivo CSS

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:8080/productsCertificadores');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        
        fetchProducts();
    }, []);
   return (
    <div>
        <h2>Lista de Productos</h2>
        <table class="table-products">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Certification</th>
                    <th scope='col'>Baño Jabonoso</th>
                    <th scope="col">Creation</th>
                    </tr>
                </thead>
            <tbody>
            {
                    products.map((product, index) => {
                        let activoDisplay = product.Activo.Valid ? product.Activo.Int64 : 'N/A';
                        let createdAtDisplay = product.CreatedAt.Valid ? product.CreatedAt.String : 'N/A';
                        let companyDisplay = product.Company.Valid ? product.Company.String : 'N/A';
                        let companyBJDisplay = product.Company_bj? product.Company_bj.String: 'N/A';
                        let banoJabonosoDisplay = product.Bano_j? product.Bano_j.Int64: 'N/A';

                        console.log(product);
                        if (activoDisplay === 'N/A'){
                            return (
                                <tr>
                                <th scope="row">{index}</th>
                                <td>{product.Name}</td>
                                <td>0</td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr>
                                <th scope="row">{index}</th>
                                <td>{product.Name}</td>
                                <td>{activoDisplay + " " + companyDisplay }</td>
                                <td>{banoJabonosoDisplay + " " + companyBJDisplay}</td>
                                <td>{createdAtDisplay}</td>
                                </tr>
                            );
                        }
                    })
                }
            </tbody>
        </table>
    </div>
   )
}

export default ProductList;
