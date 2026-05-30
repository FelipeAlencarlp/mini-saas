import { ProductType } from "@/types/dashboard/products/Product.type";

export type ModalProductsType =
    | { type: 'create' }
    | { type: 'edit'; product: ProductType }
    | { type: 'delete'; product: ProductType }
    | null;