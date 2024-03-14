import { Rating, Typography } from "@mui/material";
import { Restaurant } from "../../interfaces/restaurant-interface";

interface ReviewsInfoProps {
  restaurantData: Restaurant;
}

const ReviewsInfo: React.FC<ReviewsInfoProps> = ({ restaurantData }) => {
  const roundedRating =
    restaurantData.averageRating && Math.round(restaurantData.averageRating);

  return (
    <div className="mt-16 mb-8">
      <Typography variant="h3">Reviews</Typography>
      <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0 md:justify-around">
        <div className="flex flex-col items-start gap-3">
          <Typography variant="h5">Total Reviews</Typography>
          <span className="font-bold text-2xl md:text-4xl">
            {restaurantData.reviews.length | 0}
          </span>
        </div>
        <div className="flex flex-col items-start gap-3">
          <Typography variant="h5">Average Rating</Typography>
          <div className="flex items-center gap-3">
            <span className="font-bold text-2xl md:text-4xl">
              {roundedRating}
            </span>
            <Rating value={restaurantData.averageRating} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsInfo;
