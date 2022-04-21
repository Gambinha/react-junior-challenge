
type ProductsCatalogProps = {
    id: number;
    description: string;
}

type ProductsDetailsProps = {
    id: number;
    description: string;
    price: number;
    createdAt: string;
}

export type { ProductsCatalogProps, ProductsDetailsProps };