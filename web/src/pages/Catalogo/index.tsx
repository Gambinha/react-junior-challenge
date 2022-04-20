import MenuBar from "../../components/MenuBar";
import ProductsList from "../../components/ProductsList";

import './style.css';

const Catalogo = () => {
    return(
        <div className="catalog-page">
            <MenuBar menuTitle="Home" />

            <div className="catalog-content">
                <div className="content-head">
                    <h1>Lista de Produtos</h1>
                </div>

                <ProductsList />
            </div>
        </div>
    );
}

export default Catalogo;