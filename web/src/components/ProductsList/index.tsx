import { useState } from 'react';
import { useQuery } from 'react-query';
import { ProductsCatalogProps } from '../../core/types/productsTypes';

import { api } from "../../core/services/api";
import { useQueryClient } from 'react-query';

import './style.css';

import Product from '../Product';
import Popup from '../Popup';

const ProductsList = () => {
    const [showCreateProductPopup, setShowCreateProductPopup] = useState<boolean>(false);

    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    const queryClient = useQueryClient();

    const fetchApiToAddNewProduct = () => {
        if ( (description.length === 0) || (price < 1) ) {
            if(description.length === 0) alert("Por favor, descreva o produto corretamente!");
            else if(price < 1) alert("Por favor, insira o preço do produto corretamente!");
        } else {
            api.post("/products", {
                description: description,
                price: price
            }).then(async (response) => {
                await queryClient.invalidateQueries(["PRODUCTS"])
                setShowCreateProductPopup(false);
            }).catch(error => {
                console.log(error);

                alert("Erro no Servidor! Tente novamente.")
            })
        }
    }

    const { data: products, isFetching, isError } = useQuery<ProductsCatalogProps[]>('PRODUCTS', async () => {
        const response = await api.get("/products");

        return response.data.data;
    })

    return (
        <div className="products-container">
            <button className="addProductButton" onClick={ () => setShowCreateProductPopup(true) }>
                + Adicionar Produto
            </button>

            {   isFetching ?

                <span>Buscando Produtos...</span>

                :
            
                isError ? 

                <span>Erro no Servidor! Tente reiniciar a página.</span>
            
                :

                products?.length || -1 > 0 ? 

                products?.map((product) => {
                    return (
                        <Product id={product.id} description={product.description} key={product.id} />
                    );
                })

                :

                <span>Não há produtos. Cadastre um novo!</span>

            }

            <Popup trigger={showCreateProductPopup} setTrigger={setShowCreateProductPopup} >
                <>
                    <h2>Adicionar Produto</h2>

                    <div className="product-form">
                        <div className="product-form-inputs">
                            <label htmlFor="description" >Descrição (200):</label>
                            <textarea 
                                placeholder="Descreva o produto..." 
                                name="description" 
                                maxLength={200}
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </div>

                        <div className="product-form-inputs">
                            <label htmlFor="price">Preço (R$):</label>
                            <input 
                                placeholder="Preço do Produto (Min. 1)..." 
                                type="number" 
                                name="price"
                                min={1} 
                                onChange={(e) => setPrice(Number(e.target.value))} 
                            />
                        </div>

                        <button onClick={ fetchApiToAddNewProduct } >
                            + Adicionar
                        </button>
                    </div>    
                </>
            </Popup>
        </div>
    );
}

export default ProductsList;