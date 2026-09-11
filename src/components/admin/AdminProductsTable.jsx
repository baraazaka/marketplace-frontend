
import {
    Package,
    Edit,
    Trash2
} from "lucide-react";

function AdminProductsTable({
    products,
    onEdit,
    onDelete
}) {
    if (!products || products.length === 0) {
        return (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-12 text-center">
                <Package className="mx-auto h-10 w-10 text-slate-300" />

                <h3 className="mt-4 font-black text-slate-900">
                    No products found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filter.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Product
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Seller
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Category
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Price
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Stock
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                                Added
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50"
                            >
                                {/* Product */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={
                                                    product.name ||
                                                    "Product"
                                                }
                                                className="h-14 w-14 rounded-2xl object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50">
                                                <Package className="h-6 w-6 text-violet-600" />
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <p className="max-w-[220px] truncate font-black text-slate-900">
                                                {product.name ||
                                                    "Unnamed Product"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                ID: #{product.id}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Seller */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {product.profiles?.avatar_url ? (
                                            <img
                                                src={
                                                    product
                                                        .profiles
                                                        .avatar_url
                                                }
                                                alt={
                                                    product
                                                        .profiles
                                                        ?.full_name ||
                                                    "Seller"
                                                }
                                                className="h-10 w-10 rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                                                <span className="text-sm font-black text-emerald-600">
                                                    {(
                                                        product
                                                            .profiles
                                                            ?.full_name ||
                                                        "S"
                                                    )
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                        )}

                                        <div>
                                            <p className="max-w-[150px] truncate font-bold text-slate-900">
                                                {product
                                                    .profiles
                                                    ?.full_name ||
                                                    "Unknown Seller"}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600">
                                        {product.categories?.name ||
                                            "Uncategorized"}
                                    </span>
                                </td>

                                {/* Price */}
                                <td className="px-6 py-4">
                                    <p className="font-black text-slate-900">
                                        $
                                        {Number(
                                            product.price || 0
                                        ).toFixed(2)}
                                    </p>
                                </td>

                                {/* Stock */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`font-black ${
                                            Number(
                                                product.stock || 0
                                            ) === 0
                                                ? "text-red-600"
                                                : Number(
                                                      product.stock ||
                                                          0
                                                  ) <= 5
                                                ? "text-amber-600"
                                                : "text-emerald-600"
                                        }`}
                                    >
                                        {product.stock || 0}
                                    </span>
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                                    {new Date(
                                        product.created_at
                                    ).toLocaleDateString()}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onEdit(product)
                                            }
                                            className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                                            title="Edit product"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onDelete(product)
                                            }
                                            className="rounded-xl border border-red-200 p-2.5 text-red-500 transition hover:bg-red-50"
                                            title="Delete product"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminProductsTable;

