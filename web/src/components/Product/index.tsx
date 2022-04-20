import { ProductsCatalogProps } from '../../core/types/productsTypes';
import { Link } from "react-router-dom";

import './style.css';

const Product: React.FC<ProductsCatalogProps> = ({id, description}) => {
    return (
        <div className="product">
            <div className="product-infos">
                <span title={`#${id}`}  className='product-id' > #{ id } </span>
                <span title={ description } className='product-description'> { description } </span>
            </div>

            <Link to={`produto/${id}`}>
                <button>
                    Ver Detalhes
                </button>
            </Link>
        </div>
    );
}

export default Product;