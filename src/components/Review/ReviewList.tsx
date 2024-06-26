import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Review } from "../../interfaces/review-interface";
import ReviewItem from "./ReviewItem";
import { Restaurant } from "../../interfaces/restaurant-interface";
import ReviewsInfo from "./ReviewsInfo";
import AddReviewForm from "./AddReviewForm";
import Container from "../Container";

const ReviewList = () => {
  const reviews = useSelector<RootState, Review[]>(
    (state) => state.findRestaurantById.reviews
  );
  const restaurant = useSelector<RootState, Restaurant>(
    (state) => state.findRestaurantById
  );
  return (
    <Container>
      <div>
        <ReviewsInfo restaurantData={restaurant} />
      </div>
      <div>
        <AddReviewForm />
      </div>
      <div>
        <ul>
          {reviews.map((review) => (
            <li key={review.userId}>
              <ReviewItem review={review} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default ReviewList;
