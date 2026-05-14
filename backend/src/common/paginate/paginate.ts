import { PaginatedParams } from "../types/paginated-params.type";
import { PaginatedResult } from "../types/paginated-result.type";

export async function paginate<T>(
    model: {
        findMany: Function;
        count: Function;
    },
    params: PaginatedParams,
    options?: {
        where?: any;
        orderBy?: any;
        include?: any;
        select?: any;
    }
): Promise<PaginatedResult<T>> {
    const page = Math.max(parseInt(params.page || '1'), 1);
    const limit = Math.min(parseInt(params.limit || '10'), 100);

    const skip = (page - 1) * limit;

    const where = options?.where || {};
    const orderBy = options?.orderBy || { id: 'asc' };
    const include = options?.include;
    const select = options?.select;

    const [data, total] = await Promise.all([
        model.findMany({
            skip,
            take: limit,
            where,
            orderBy,
            include,
            select
        }),
        model.count({ where })
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
        data,
        meta: {
            total,
            page,
            lastPage,
            limit
        }
    };
}