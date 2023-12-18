import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompanyList() {
    const [company, setCompany] = useState([]);
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:8080/companylist');
                setCompany(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Lista de Compañias</h2>
            <table class="table-products">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Certification</th>
                    <th scope="col">Creation</th>
                    </tr>
                </thead>
            <tbody>
            {
                    company.map((company, index) => {
                        let activoDisplay = company.Activo.Valid ? company.Activo.Int64 : 'N/A';
                        let createdAtDisplay = company.CreatedAt.Valid ? company.CreatedAt.String : 'N/A';
                        if (activoDisplay === 'N/A'){
                            console.log(company);
                            return (
                                <tr>
                                <th scope="row">{index}</th>
                                <td>{company.CompanyName}</td>
                                <td>0</td>
                                </tr>
                            );
                        } else {
                            console.log(company);
                            return (
                                <tr>
                                <th scope="row">{index}</th>
                                <td>{company.CompanyName}</td>
                                <td>{activoDisplay }</td>
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

export default CompanyList;