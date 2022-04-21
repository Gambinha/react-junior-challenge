import { Request, Response } from "express";

import { 
    QueryCreateProduct, 
    QueryListProducts, 
    QueryListProductById,
    QueryUpdateProductById,
    QueryDeleteProductById
} from "../services/ProductTable";

import responseMessages from "../constants/responseMessages";
import responseStatus from "../constants/responseStatus";

const {
    successMessages: {
        SUCCESS_CREATED_PRODUCT,
        SUCCESS_LISTED_PRODUCTS,
        SUCCESS_LISTED_PRODUCT,
        SUCCESS_UPDATED_PRODUCT,
        SUCCESS_DELETED_PRODUCT
    },
    errorMessages: {
        ERROR_CREATED_PRODUCT,
        ERROR_LISTED_PRODUCTS,
        ERROR_UPDATED_PRODUCT,
        ERROR_DELETED_PRODUCT,
        ERROR_PRODUCT_NOT_FOUND
    }
} = responseMessages;

const {
    successStatus: {
        SUCCESS,
        SUCCESS_CREATED,
    },
    errorStatus: {
        ERROR_BAD_REQUEST
    }
} = responseStatus;

const createProduct = (request: Request, response: Response) => {
    const { 
        description,
        price
    } = request.body;

    const createdProduct = QueryCreateProduct(description, price);

    createdProduct
        .then((data) => {
            return response.status(SUCCESS_CREATED).json({ success: true, message: SUCCESS_CREATED_PRODUCT, data: data })
        })
        .catch((error) => {
            return response.status(ERROR_BAD_REQUEST).json({ success: false, error: ERROR_CREATED_PRODUCT, data: null });
        })
}

const listAllProduct = (request: Request, response: Response) => {
    const productsList = QueryListProducts();

    productsList
        .then((data) => {
            return response.status(SUCCESS).json({ success: true, message: SUCCESS_LISTED_PRODUCTS, data: data });
        })
        .catch((error) => {
            return response.status(ERROR_BAD_REQUEST).json({ success: false, error: ERROR_LISTED_PRODUCTS, data: null });
        })
}

const listProductById = async (request: Request, response: Response) => {
    const { id } = request.params;

    const product = await QueryListProductById(id);

    if(!product) return response.status(SUCCESS).json({ success: true, error: ERROR_PRODUCT_NOT_FOUND, data: null });
    return response.status(SUCCESS).json({ success: true, message: SUCCESS_LISTED_PRODUCT, data: product });
}

const updateProduct = async (request: Request, response: Response) => {
    const { id } = request.params;
    const {
        description,
        price
    } = request.body;

    // test if product exists
    const product = await QueryListProductById(id);
    if(!product) return response.status(SUCCESS).json({ success: true, error: ERROR_PRODUCT_NOT_FOUND, data: null });
    
    const updatedProduct = QueryUpdateProductById(id, description, price);

    updatedProduct
        .then((data) => {
            return response.status(SUCCESS).json({ success: true, message: SUCCESS_UPDATED_PRODUCT, data: data });
        })
        .catch((error) => {
            return response.status(ERROR_BAD_REQUEST).json({ success: false, error: ERROR_UPDATED_PRODUCT, data: null });
        })
}

const deleteProduct = async (request: Request, response: Response) => {
    const { id } = request.params;

    // test if product exists
    const product = await QueryListProductById(id);
    if(!product) return response.status(SUCCESS).json({ success: true, error: ERROR_PRODUCT_NOT_FOUND, data: null });

    const deletedProduct = QueryDeleteProductById(id);

    deletedProduct
        .then((data) => {
            return response.status(SUCCESS).json({ success: true, message: SUCCESS_DELETED_PRODUCT, data: data });
        })
        .catch((error) => {
            return response.status(ERROR_BAD_REQUEST).json({ success: false, error: ERROR_DELETED_PRODUCT, data: null });
        })
}

export {createProduct, listAllProduct, listProductById, updateProduct, deleteProduct};