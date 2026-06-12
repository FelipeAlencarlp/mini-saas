import { Item } from "./Item.type";

export type ProductsListProps = {
    items: Item[];
    handleChangeQuantity: (id: number, value: string) => void;
    handleRemoveProductList: (id: number) => void;
};