import { AddReview } from './AddReview';
import { ReviewList } from './ReviewList';

export const ReviewSection = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
        <AddReview />
        <ReviewList />
    </div>
  )
}
