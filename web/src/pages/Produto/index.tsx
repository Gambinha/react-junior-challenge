import MenuBar from "../../components/MenuBar";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import './style.css';

const Produto = () => {
    const { id } = useParams();

    useEffect(() => {
        fetchApiToGetOneProduct();
    }, [id]);

    const fetchApiToGetOneProduct = () => {
        // setLoagingWhenGettingProducts(true);

        // api.get("/products")
        //     .then((response) => {
        //         const data: ResponseProps = response.data;
        //         const productsList = data.data;

        //         setProducts(productsList);
        //         setErrorWhenGettingProducts(false);
        //     })
        //     .catch((error) => {
        //         console.log(error);

        //         setErrorWhenGettingProducts(true);
        //     })
        //     .finally(() => {
        //         setLoagingWhenGettingProducts(false);
        //     })
    }

    return (
        <div className="product-page">
            <MenuBar menuTitle="Produto" />

            <div className="product-content">
                <div className="content-head">
                    <h1>Detalhes do Produto</h1>
                </div>

                <div className="product-informations">

                </div>
            </div>
        </div>
    );
}

export default Produto;