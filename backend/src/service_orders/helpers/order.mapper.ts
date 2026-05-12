import { ServiceOrderEntity } from "../entity/service-order.entity";

export function orderMapper(order: any): ServiceOrderEntity {
    return {
        ...order,
        items: order.items.map(item => ({
            ...item,
            soldPrice: item.soldPrice.toNumber(),
            subtotal: item.subtotal.toNumber()
        })),
    }
}