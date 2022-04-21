import { useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import MenuBar from "../../components/MenuBar";
import './style.css';
import { ProductsDetailsProps } from '../../core/types/productsTypes';
import { api } from "../../core/services/api";
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Popup from "../../components/Popup";

const Produto = () => {
    const { id } = useParams();

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [showEditProductPopup, setShowEditProductPopup] = useState<boolean>(false);

    const [editedDescription, setEditedDescription] = useState<string>("");
    const [editedPrice, setEditedPrice] = useState<number>(0);

    const { data: product, isFetching, isError } = useQuery<ProductsDetailsProps>('PRODUCT', async () => {
        const response = await api.get(`/products/${id}`);
        const data = response.data.data;

        setEditedDescription(data.description);
        setEditedPrice(data.price);

        return data;
    })

    const fetchApiToDeleteProduct = () => {
        api.delete(`/products/${id}`)
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                alert("Erro no Servidor! Tente novamente.")
            })
    }

    const fetchApiToEditProduct = () => {
        if ( (editedDescription === product?.description) && (editedPrice === product?.price) ) {
            alert("Dados inalterados!");
        } 
        else if ( (editedDescription.length === 0) || (editedPrice < 1) ) {
            if(editedDescription.length === 0) alert("Por favor, descreva o produto corretamente!");
            else if(editedPrice < 1) alert("Por favor, insira o preço do produto corretamente!");
        } 
        else {
            api.patch(`/products/${id}`, {
                description: editedDescription,
                price: editedPrice
            }).then(async (response) => {
                await queryClient.invalidateQueries(["PRODUCT"])
                setShowEditProductPopup(false);
            }).catch(error => {
                alert("Erro no Servidor! Tente novamente.")
            })
        }
    }

    return (
        <div className="product-page">
            <MenuBar menuTitle="Produto" />

            <div className="product-content">
                <div className="content-head">
                    <Link to={"/"} >
                        <BiArrowBack title="Back" className="go-home-button" />
                    </Link>

                    <h1>Detalhes do Produto</h1>
                </div>

                <div className="product-informations">
                    {   isFetching ?

                        <span>Buscando Produtos...</span>

                        :

                        isError ? 

                        <span>Erro no Servidor! Tente reiniciar a página.</span>

                        : 

                        product != null ?

                        <>
                            <div className="main-informations">
                                <h1 title={`#${product?.id}`} className="product-id" > #{product?.id} </h1>
                                <span title={`${product?.description}`} className="product-description" >{product?.description}</span>
                                <span title={`R$${product?.price}`} className="product-price" > R${product?.price}</span>
                            </div>

                            <span title={`${product?.createdAt}`} className="product-date" > Data de Cadastro: {product?.createdAt.split('T')[0]}</span>

                            <div className="products-buttons">
                                <button className="edit-product" onClick={ () => setShowEditProductPopup(true) } > Editar </button>
                                <button className="delete-product" onClick={ fetchApiToDeleteProduct } > Excluir </button>
                            </div>
                        </>

                        :

                        <span>Não há um produto com este código!</span>
                    }
                </div>

                <Popup trigger={showEditProductPopup} setTrigger={setShowEditProductPopup} >
                <>
                    <h2>Editar Produto</h2>

                    <div className="product-form">
                        <div className="product-form-inputs">
                            <label htmlFor="description" >Descrição (200):</label>
                            <textarea 
                                defaultValue={product?.description}
                                placeholder="Descreva o produto..." 
                                name="description" 
                                maxLength={200}
                                onChange={(e) => setEditedDescription(e.target.value)} 
                            />
                        </div>

                        <div className="product-form-inputs">
                            <label htmlFor="price">Preço (R$):</label>
                            <input 
                                defaultValue={product?.price}
                                placeholder="Preço do Produto (Min. 1)..." 
                                type="number" 
                                name="price"
                                min={1} 
                                onChange={(e) => setEditedPrice(Number(e.target.value))} 
                            />
                        </div>

                        <button onClick={ fetchApiToEditProduct } >
                            Editar
                        </button>
                    </div>    
                </>
            </Popup>

            </div>
        </div>
    );
}

export default Produto;