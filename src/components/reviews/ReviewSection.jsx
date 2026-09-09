
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import { getProductReviews } from "../../services/api";
import ReviewForm from "./ReviewForm";

function ReviewSection({ productId }) {
    const [reviewData, setReviewData] = useState({
        average_rating: 0,
        total_reviews: 0,
        reviews: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadReviews() {
        try {
            setLoading(true);
            setError("");

            const data = await getProductReviews(productId);

            setReviewData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadReviews();
    }, [productId]);

    if (loading) {
        return (
            <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
                <div className="flex items-center justify-center py-10">
                    <div className="text-center">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />

                        <p className="mt-3 text-sm font-medium text-slate-500">
                            Loading reviews...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">
                <p className="text-center text-sm font-medium text-red-500">
                    {error}
                </p>
            </section>
        );
    }

    return (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10">

            {/* Header */}
            <div className="flex flex-col gap-6 border-b border-slate-100 pb-8 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Customer Reviews
                    </p>

                    <h2 className="mt-2 text-3xl font-black text-slate-900">
                        Reviews & Ratings
                    </h2>
                </div>

                {/* Rating Summary */}
                <div className="flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50">
                        <span className="text-2xl font-black text-violet-600">
                            {Number(reviewData.average_rating).toFixed(1)}
                        </span>
                    </div>

                    <div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                        star <= Math.round(
                                            reviewData.average_rating
                                        )
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-slate-300"
                                    }`}
                                />
                            ))}
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                            Based on {reviewData.total_reviews}{" "}
                            {reviewData.total_reviews === 1
                                ? "review"
                                : "reviews"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Review Form */}
            <ReviewForm
                productId={productId}
                onReviewCreated={loadReviews}
            />

            {/* Reviews List */}
            {reviewData.reviews.length === 0 ? (
                <div className="py-12 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <Star className="h-6 w-6 text-slate-400" />
                    </div>

                    <h3 className="mt-4 font-bold text-slate-900">
                        No reviews yet
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Be the first to review this product.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">

                    {reviewData.reviews.map((review) => (
                        <div
                            key={review.id}
                            className="py-6"
                        >

                            {/* User Info + Date */}
                            <div className="flex items-start justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    {/* Avatar */}
                                    {review.profiles?.avatar_url ? (
                                        <img
                                            src={review.profiles.avatar_url}
                                            alt={
                                                review.profiles.full_name ||
                                                "User"
                                            }
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-black text-violet-600">
                                            {review.profiles?.full_name
                                                ?.charAt(0)
                                                .toUpperCase() || "U"}
                                        </div>
                                    )}

                                    {/* Name + Rating */}
                                    <div>
                                        <p className="font-bold text-slate-900">
                                            {review.profiles?.full_name ||
                                                "Anonymous User"}
                                        </p>

                                        <div className="mt-1 flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-4 w-4 ${
                                                        star <= review.rating
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-slate-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Date */}
                                <span className="shrink-0 text-xs text-slate-400">
                                    {new Date(
                                        review.created_at
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </span>
                            </div>

                            {/* Comment */}
                            <p className="mt-4 pl-[52px] text-sm leading-6 text-slate-600">
                                {review.comment || "No comment provided."}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ReviewSection;

