
type ProductsCatalogProps = {
    id: number;
    description: string;
}

type ProductsDetailsProps = {
    id: number;
    description: string;
    price: number;
    created_at: Date;
}

export type { ProductsCatalogProps, ProductsDetailsProps };