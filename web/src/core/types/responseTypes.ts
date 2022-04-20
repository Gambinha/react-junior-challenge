import { ProductsCatalogProps } from './productsTypes';

type ResponseProps = {
    success: boolean;
    message: string;
    data: ProductsCatalogProps[]
}

export type { ResponseProps };