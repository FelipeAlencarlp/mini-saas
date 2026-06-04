import { ProductType } from "../products/Product.type";

export type SelectProductProps = {
    value: string;
    error: string;
    products: ProductType[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};