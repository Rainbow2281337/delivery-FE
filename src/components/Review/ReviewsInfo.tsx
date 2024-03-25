import { Rating, Typography } from "@mui/material";
import { Restaurant } from "../../interfaces/restaurant-interface";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";

interface ReviewsInfoProps {
  restaurantData: Restaurant;
}

const ReviewsInfo: React.FC<ReviewsInfoProps> = ({ restaurantData }) => {
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  const roundedRating =
    restaurantData.averageRating && Math.round(restaurantData.averageRating);

  return (
    <div className="mt-16 mb-8">
      <div className="text-black dark:text-white">
        <Typography variant="h3">
          {translate("reviews", preferredLanguage)}
        </Typography>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0 md:justify-around">
        <div className="flex flex-col items-start gap-3">
          <div className="text-neutral-500 dark:text-neutral-300">
            <Typography variant="h5">
              {translate("total_reviews", preferredLanguage)}
            </Typography>
          </div>
          <span className="font-bold text-2xl md:text-4xl dark:text-white">
            {restaurantData.reviews.length | 0}
          </span>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="text-neutral-500 dark:text-neutral-300">
            <Typography variant="h5">
              {translate("average_rating", preferredLanguage)}
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-2xl md:text-4xl dark:text-white">
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
