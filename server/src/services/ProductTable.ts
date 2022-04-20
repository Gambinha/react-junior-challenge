import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const QueryCreateProduct = (description: string, price: number) => {
    return prisma.product.create({
        data: {
            description: description,
            price: price
        }
    })
}

const QueryListProducts = () => {
    return prisma.product.findMany({
        select: {
            id: true,
            description: true
        }
    });
}

const QueryListProductById = (id: string) => {
    return prisma.product.findUnique({
        where: {
            id: Number(id)
        }
    })
}

const QueryUpdateProductById = (id: string, description: string, price: number) => {
    return prisma.product.update({
        where: {
            id: Number(id)
        },
        data: {
            description: description,
            price: price
        }
    })
}

const QueryDeleteProductById = (id: string) => {
    return prisma.product.delete({
        where: {
            id: Number(id)
        }
    })
}

export {QueryCreateProduct, QueryListProducts, QueryListProductById, QueryUpdateProductById, QueryDeleteProductById};