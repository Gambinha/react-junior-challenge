import { Request, Response, Router } from 'express';

import { 
    createProduct, 
    listAllProduct, 
    listProductById,
    deleteProduct, 
    updateProduct 
} from './controllers/ProductController';

const routes = Router();

routes.post("/products", createProduct);
routes.get("/products", listAllProduct);
routes.get("/products/:id", listProductById);
routes.patch("/products/:id", updateProduct);
routes.delete("/products/:id", deleteProduct);

export default routes;