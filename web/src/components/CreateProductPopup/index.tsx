import { Dispatch, SetStateAction, useState } from "react";
import { api } from "../../core/services/api";

import { ResponseProps } from '../../core/types/responseTypes';

import './style.css';

type CreateProductPopupProps = {
    trigger: boolean;
    setTrigger: Dispatch<SetStateAction<boolean>>;
    reloadProductsList: () => void;
}

const CreateProductPopup: React.FC<CreateProductPopupProps> = (props) => {
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    const fetchApiToAddNewProduct = () => {
        console.log(price)
        if ( (description.length === 0) || (price < 1) ) {
            alert("Estão faltando informações!");
        } else {
            api.post("/products", {
                description: description,
                price: price
            }).then(response => {
                const data: ResponseProps = response.data;

                props.reloadProductsList();
                props.setTrigger(false);
            }).catch(error => {
                console.log(error);

                alert("Erro no Servidor! Tente novamente.")
            })
        }
    }

    return props.trigger ? (

        <div className="popup">
            <div className="overlay" onClick={() => props.setTrigger(false)} ></div>    
            <div className="popup-content-container">
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
            </div>
        </div>

    ) : null
}

export default CreateProductPopup;