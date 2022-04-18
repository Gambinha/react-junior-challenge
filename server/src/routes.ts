import { Request, Response, Router } from 'express';

const routes = Router();

routes.get("/products", (request: Request, response: Response) => {
    console.log('Entrou!!');

    response.send('Okkk!');
})

export default routes;