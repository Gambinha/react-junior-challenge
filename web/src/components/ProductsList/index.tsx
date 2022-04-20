import { useState, useEffect } from 'react';
import { ProductsCatalogProps } from '../../core/types/productsTypes';
import { ResponseProps } from '../../core/types/responseTypes';

import { api } from "../../core/services/api";

import './style.css';

import Product from '../Product';
import CreateProductPopup from '../CreateProductPopup';

const ProductsList = () => {
    const [products, setProducts] = useState<ProductsCatalogProps[]>([]);

    const [showCreateProductPopup, setShowCreateProductPopup] = useState<boolean>(false);

    const [errorWhenGettingProducts, setErrorWhenGettingProducts] = useState<boolean>(false);
    const [loadingWhenGettingProducts, setLoagingWhenGettingProducts] = useState<boolean>(false);

    useEffect(() => {
        fetchApiToGetAllProducts();
    }, [])
 
    const fetchApiToGetAllProducts = () => {
        setLoagingWhenGettingProducts(true);

        api.get("/products")
            .then((response) => {
                const data: ResponseProps = response.data;
                const productsList = data.data;

                setProducts(productsList);
                setErrorWhenGettingProducts(false);
            })
            .catch((error) => {
                console.log(error);

                setErrorWhenGettingProducts(true);
            })
            .finally(() => {
                setLoagingWhenGettingProducts(false);
            })
    }

    return (
        <div className="products-container">
            <button className="addProductButton" onClick={ () => setShowCreateProductPopup(true) }>
                + Adicionar Produto
            </button>

            {   loadingWhenGettingProducts ?

                <span>Buscando Produtos...</span>

                :
            
                errorWhenGettingProducts ? 

                <span>Erro no Servidor! Tente reiniciar a página.</span>
            
                :

                products.length > 0 ? 

                products.map((product) => {
                    return (
                        <Product id={product.id} description={product.description} key={product.id} />
                    );
                })

                :

                <span>Não há produtos. Cadastre um novo!</span>

            }

            <CreateProductPopup trigger={showCreateProductPopup} setTrigger={setShowCreateProductPopup} reloadProductsList={fetchApiToGetAllProducts} />
        </div>
    );
}

export default ProductsList;