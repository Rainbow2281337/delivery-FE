import { Rating } from "@mui/material";
import { Review } from "../../interfaces/review-interface";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

interface ReviewItemProps {
  review?: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div>
      <div className="flex flex-col gap-4 items-start md:flex-row md:gap-0 md:items-center justify-around p-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <PersonOutlineOutlinedIcon
              fontSize="large"
              className="text-white"
            />
          </div>
          <div className="font-medium text-md md:text-lg">
            {review?.userFirstName}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div>
              <Rating value={review?.rating} readOnly />
            </div>
            <div className="text-yellow-500 font-medium text-lg">
              {review?.rating}
            </div>
          </div>
          <div className="font-medium text-md md:text-lg text-gray-400">
            {review?.comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
