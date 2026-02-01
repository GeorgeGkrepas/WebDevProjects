import { useEffect, useState } from "react";
import { listenToReviews, deleteReview } from "./firebase";
import { getAuth } from "firebase/auth";

export const ReviewList = () => {
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;

    const unsubscribe = listenToReviews(user.uid, (reviews) => {
      setReviews(reviews);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  
  return (
    <div className="max-w-2xl mx-auto">
      <ul className="space-y-4">

        {reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet 🍽️</p>
        )}

        {reviews.map((review) => (
          <li key={review.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {review.restaurantName}
              </h3>
              <span className="text-yellow-500">
                {"⭐".repeat(review.rating)}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Favorite dishes:</span>{" "}
              {review.favoriteDishes}
            </p>

            <div className="flex justify-between items-center">
              <p className="line-clamp-3 text-sm text-gray-600">
                <span className="font-medium">Comments:</span>{" "}
                {review.comments}
              </p>
              <span onClick={() => deleteReview(review.id)} className="cursor-pointer">
                <img src="../images/Red_X.png" alt="Delete" className="w-6 h-6"></img>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
