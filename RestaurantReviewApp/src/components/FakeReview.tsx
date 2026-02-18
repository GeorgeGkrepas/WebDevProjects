interface FakeReviewProps {
    name: string;
    rating: number;
    category: string;
    favoriteDishes: string;
    comments: string;
    friendName?: string;
}

export const FakeReview = (props: FakeReviewProps) => {
  return (
    <div>
        <div className={`rounded-lg p-4 shadow-sm hover:shadow-md transition ${props.friendName ? "border-2 bg-white border-purple-800" : "border border-gray-200 bg-white"}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {props.name}  <span className="text-sm text-gray-500">({props.category})</span>
              </h3>
              <span className="text-yellow-500">
                {"⭐".repeat(props.rating)}
              </span>
            </div>
            {props.friendName && ( // Only show friend name if it's a friend review
              <p className="text-xs text-purple-400 font-medium italic">
                review by {props.friendName}
              </p>
            )}

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Favorite dishes:</span>{" "}
              {props.favoriteDishes}
            </p>

            <div className="flex justify-between items-center">
              <p className="line-clamp-3 text-sm text-gray-600">
                <span className="font-medium">Comments:</span>{" "}
                {props.comments}
              </p>
            </div>
          </div>
    </div>
  )
}
