import { useState, type FormEvent } from "react";
import { addReview } from "./firebase"

export const AddReview = () => {

    const [restaurantName, setRestaurantName] = useState("");
    const [rating, setRating] = useState("");
    const [favoriteDishes, setFavoriteDishes] = useState("");
    const [comments, setComments] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await addReview(
        restaurantName,
        rating,
        favoriteDishes,
        comments
        );

        // optional: reset form
        setRestaurantName("");
        setRating("");
        setFavoriteDishes("");
        setComments("");
    };

    return (
        <div className="mx-auto p-4 outline-2 outline-gray-900 mb-6 rounded-xl">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    placeholder="Restaurant Name"
                    value={restaurantName}
                    maxLength={25}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="p-2 rounded text-black outline"
                    required
                />

                <select className="p-2 rounded text-black outline" value={rating} onChange={(e) => setRating(e.target.value)} required>
                    <option value="" disabled>Select Rating</option>
                    <option value="1">1⭐</option>
                    <option value="2">2⭐</option>
                    <option value="3">3⭐</option>
                    <option value="4">4⭐</option>
                    <option value="5">5⭐</option>
                </select>

                <input
                    type="text"
                    placeholder="Favorite Dish(es)"
                    value={favoriteDishes}
                    maxLength={50}
                    onChange={(e) => setFavoriteDishes(e.target.value)}
                    className="p-2 rounded text-black outline"
                    required
                />

                <input
                    type="text"
                    placeholder="Comments"
                    value={comments}
                    maxLength={100}
                    onChange={(e) => setComments(e.target.value)}
                    className="p-2 rounded text-black outline"
                    required
                />

                <button className="ml-auto shrink-0 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    + Add Review
                </button>
            </form>
        </div>
    )
}
