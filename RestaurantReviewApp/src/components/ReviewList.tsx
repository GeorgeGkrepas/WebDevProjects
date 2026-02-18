import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { listenToReviews, listenToFriendReviews, deleteReview } from "./firebase";
import { getAuth } from "firebase/auth";
import { useConfirm } from "./ConfirmModal";

const categoryOptions = [
        { value: "🍕Pizza", label: "🍕Pizza" },
        { value: "🍝Pasta", label: "🍝Pasta" },
        { value: "🍔Burgers", label: "🍔Burgers" },
        { value: "🍜Noodles", label: "🍜Noodles" },
        { value: "🍣Sushi", label: "🍣Sushi" },
        { value: "🏛️Greek", label: "🏛️Greek" },
        { value: "🍰Desserts", label: "🍰Desserts" },
        { value: "🍗Fried Chicken", label: "🍗Fried Chicken" },
        { value: "🥪Sandwiches", label: "🥪Sandwiches" },
        { value: "🥗Salads", label: "🥗Salads" },
        { value: "🍖Grill/BBQ", label: "🍖Grill/BBQ" },
        { value: "🌮Tacos", label: "🌮Tacos" },
        { value: "☕Coffee", label: "☕Coffee" },
        { value: "🍹Drinks", label: "🍹Drinks" }
    ];

export const ReviewList = () => {
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [friendReviews, setFriendReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<any[]>([]);
  const [showFriendReviews, setShowFriendReviews] = useState(false);

  const confirm = useConfirm();

  // Listen to user's own reviews
  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;

    const unsubscribe = listenToReviews(user.uid, (reviews) => {
      setReviews(reviews);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to friend reviews when the toggle is enabled
  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;

    if (!showFriendReviews) {
      setFriendReviews([]);
      return;
    }

    const unsubscribe = listenToFriendReviews((reviews) => {
      setFriendReviews(reviews);
    });

    return () => unsubscribe();
  }, [showFriendReviews]);

  // Review filtering logic
  const filteredReviews = useMemo(() => {

    const selectedCategories = category.map(c => c.value);
    const allReviews = showFriendReviews ? [...reviews, ...friendReviews] : reviews;

    return allReviews.filter((review) =>{
      const matchesSearch = review.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => review.category.includes(cat));

      return matchesSearch && matchesCategory;
    });
  }, [reviews, searchQuery, category, friendReviews, showFriendReviews]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  const handleDelete = async (restaurantName: string) => {
    if(
        await confirm.confirm({
          title: "Delete Review",
          message: 'Are you sure you want to delete your review for "' + restaurantName + '"?',
          confirmText: "Delete",
          cancelText: "Cancel",
          danger: true,
        })
      ){
        await deleteReview(restaurantName);
      }
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      
      <div className="flex items-center flex-col justify-between mb-4 border-3 border-black rounded-lg p-4">
        <h2 className="text-black text-xl mb-2 font-bold underline">Filters</h2>
        <input type="text" placeholder="Search for a review..." className="w-full rounded-md border p-2 mb-4 focus:outline-none border-blue-500" 
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="w-full flex items-center gap-4">
          <div className="flex-1">
            <Select
                isMulti
                options={categoryOptions}
                value={category}
                onChange={(selected) => setCategory(selected as any[])}
                placeholder="Select Categories"
                className="w-full text-black bg-gray-300 rounded"
                classNamePrefix="react-select"
            />
          </div>
          <div className="flex items-center whitespace-nowrap">
            <input type="checkbox" id="friendReviews" className="accent-purple-400" checked={showFriendReviews} onChange={(e) => setShowFriendReviews(e.target.checked)} />
            <label htmlFor="friendReviews" className="ml-2 text-sm text-gray-700">Show Friend Reviews</label>
          </div>
        </div>
      </div>

      <ul className="space-y-4">

        {filteredReviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet 🍽️</p>
        )}

        {filteredReviews.map((review) => (
          <li key={review.id} className={`rounded-lg p-4 shadow-sm hover:shadow-md transition ${review.friendUID ? "border-2 bg-white border-purple-800" : "border border-gray-200 bg-white"}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {review.restaurantName}  <span className="text-sm text-gray-500">({review.category})</span>
              </h3>
              <span className="text-yellow-500">
                {"⭐".repeat(review.rating)}
              </span>
            </div>
            {review.friendName && ( // Only show friend name if it's a friend review
              <p className="text-xs text-purple-400 font-medium italic">
                review by {review.friendName}
              </p>
            )}

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Favorite dishes:</span>{" "}
              {review.favoriteDishes}
            </p>

            <div className="flex justify-between items-center">
              <p className="line-clamp-3 text-sm text-gray-600">
                <span className="font-medium">Comments:</span>{" "}
                {review.comments}
              </p>
              {!review.friendUID && (
                <span onClick={() => handleDelete(review.id)} className="cursor-pointer">
                  <img src="../images/RedX.png" alt="Delete" className="w-6 h-6" />
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
