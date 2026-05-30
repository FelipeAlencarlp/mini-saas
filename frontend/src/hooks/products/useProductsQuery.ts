import { useQuery } from "@tanstack/react-query";
import { getProductsRequest } from "@/services/products/getProductsRequest";

export function useProductsQuery(
    search: string,
    page: number
) {
    return useQuery({
        queryKey: ['products', search, page],
        queryFn: () => getProductsRequest(search, page),
        placeholderData: (previousData) => previousData,
    });
}