import { AddReview } from './AddReview';
import { ReviewList } from './ReviewList';

export const ReviewSection = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-5 text-center w-full underline">Reviews Section</h1>
        <AddReview />
        <ReviewList />
    </div>
  )
}
