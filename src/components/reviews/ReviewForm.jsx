
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Send } from "lucide-react";
import { createReview } from "../../services/api";

function ReviewForm({ productId, onReviewCreated }) {
    const token = localStorage.getItem("access_token");

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    if (!token) {
        return (
            <div className="mt-8 rounded-2xl border border-violet-100 bg-violet-50 p-6 text-center">
                <p className="text-sm font-medium text-slate-600">
                    You need to be logged in to leave a review.
                </p>

                <Link
                    to="/login"
                    className="mt-4 inline-flex items-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
                >
                    Login to Review
                </Link>
            </div>
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (rating === 0) {
            setError("Please select a rating.");
            return;
        }

        try {
            setLoading(true);

            await createReview(
                productId,
                rating,
                comment.trim()
            );

            setRating(0);
            setHoverRating(0);
            setComment("");

            setSuccess("Your review has been added successfully.");

            if (onReviewCreated) {
                await onReviewCreated();
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div>
                <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                    Share your experience
                </p>

                <h3 className="mt-1 text-xl font-black text-slate-900">
                    Write a Review
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
                {/* Rating */}
                <div>
                    <label className="text-sm font-bold text-slate-700">
                        Your Rating
                    </label>

                    <div className="mt-3 flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const activeStar =
                                star <= (hoverRating || rating);

                            return (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="rounded-lg p-1 transition hover:scale-110"
                                    aria-label={`Rate ${star} out of 5`}
                                >
                                    <Star
                                        className={`h-7 w-7 transition ${
                                            activeStar
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-slate-300"
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Comment */}
                <div className="mt-6">
                    <label
                        htmlFor="review-comment"
                        className="text-sm font-bold text-slate-700"
                    >
                        Your Comment
                    </label>

                    <textarea
                        id="review-comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        placeholder="Tell us what you think about this product..."
                        rows={4}
                        className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />
                </div>

                {/* Error */}
                {error && (
                    <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {error}
                    </p>
                )}

                {/* Success */}
                {success && (
                    <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                        {success}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Send className="h-4 w-4" />

                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    );
}

export default ReviewForm;

