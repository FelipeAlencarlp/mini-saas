export type ProductsListProps = {
    items: Item[];
    handleChangeQuantity: (id: number, value: string) => void;
    handleRemoveProductList: (id: number) => void;
};