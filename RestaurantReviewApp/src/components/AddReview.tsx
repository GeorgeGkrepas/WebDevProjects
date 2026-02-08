import { useState, type FormEvent } from "react";
import Select from "react-select";
import { addReview } from "./firebase"

// Define category options for React Select
    const categoryOptions = [
        { value: "🍕Pizza", label: "🍕Pizza" },
        { value: "🍝Pasta", label: "🍝Pasta" },
        { value: "🍔Burgers", label: "🍔Burgers" },
        { value: "🍜Noodles", label: "🍜Noodles" },
        { value: "🍣Sushi", label: "🍣Sushi" },
        { value: "🍰Desserts", label: "🍰Desserts" },
        { value: "🍗Fried Chicken", label: "🍗Fried Chicken" },
        { value: "🥪Sandwiches", label: "🥪Sandwiches" },
        { value: "🥗Salads", label: "🥗Salads" },
        { value: "🍖BBQ", label: "🍖BBQ" },
        { value: "🌮Tacos", label: "🌮Tacos" },
        { value: "☕Coffee", label: "☕Coffee" },
        { value: "🍹Drinks", label: "🍹Drinks" }
    ];

export const AddReview = () => {

    const [restaurantName, setRestaurantName] = useState("");
    const [rating, setRating] = useState("");
    const [category, setCategory] = useState<any[]>([]);
    const [favoriteDishes, setFavoriteDishes] = useState("");
    const [comments, setComments] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Convert selected categories to a comma-separated string
        const categories = category.map(c => c.value).join(", ");

        await addReview(
        restaurantName,
        rating,
        categories,
        favoriteDishes,
        comments
        );

        // optional: reset form
        setRestaurantName("");
        setRating("");
        setCategory([]);
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

                

                <div className="w-full md:w-56">
                    <Select
                        isMulti
                        options={categoryOptions}
                        value={category}
                        onChange={(selected) => setCategory(selected as any[])}
                        placeholder="Select Categories"
                        className="text-black bg-gray-300 rounded"
                        classNamePrefix="react-select"
                    />
                </div>

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
